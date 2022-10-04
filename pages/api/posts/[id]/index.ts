import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
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
          createdAt: true,
          user: { select: { id: true, name: true, avartar: true } },
        },
      },
      user: { select: { id: true, name: true, avartar: true } },
      _count: { select: { answers: true, wonderings: true } },
    },
  });
  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: Number(id),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, post, isWondering });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
