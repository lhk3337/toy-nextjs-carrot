import { NextApiRequest, NextApiResponse } from "next";

import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: { id: number };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { token },
  } = req;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  if (!exists) return res.status(404);

  req.session.user = {
    id: exists.userId,
  };
  await req.session.save();
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password: "989rruHJsJFFNe5c06Qgh2WxGYmMeQMP",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
