import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
  } = req;
  const chat = await client.chat.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      messages: { select: { message: true, createdAt: true, id: true, user: { select: { avatar: true, id: true } } } },
      product: {
        select: {
          price: true,
          imageUrl: true,
          name: true,
          id: true,
          sellState: true,
        },
      },
      seller: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
      buyer: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
    },
  });
  return res.status(200).json({ ok: true, chat });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
