import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
  } = req;
  const post = await client.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      answers: {
        select: {
          answer: true,
          id: true,
          user: { select: { id: true, name: true, avartar: true } },
        },
      },
      user: { select: { id: true, name: true, avartar: true } },
      _count: { select: { answers: true, wonderings: true } },
    },
  });
  res.json({ ok: true, post });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
