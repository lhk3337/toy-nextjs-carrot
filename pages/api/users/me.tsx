import { NextApiRequest, NextApiResponse } from "next";

import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import { json } from "stream/consumers";

declare module "iron-session" {
  interface IronSessionData {
    user?: { id: number };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const profile = await client.user.findUnique({ where: { id: req.session.user?.id } });
  res.json({ ok: true, profile });
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "carrotsession",
  password: "989rruHJsJFFNe5c06Qgh2WxGYmMeQMP",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
