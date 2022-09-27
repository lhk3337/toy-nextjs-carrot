import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const profile = await client.user.findUnique({ where: { id: req.session.user?.id } });
  res.json({ ok: true, profile });
}

export default withApiSession(withHandler({ methods: "GET", handler }));
