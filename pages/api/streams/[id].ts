import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
  } = req;

  const stream = await client.stream.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!stream) {
    res.json({ ok: false, message: "Not Founded" });
  }
  res.json({ ok: true, stream });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
