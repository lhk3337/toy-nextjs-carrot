import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;
  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: Number(id),
        },
      },
      answer,
    },
  });
  res.json({ ok: true, answer: newAnswer });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
