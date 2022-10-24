import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { id },
    session: { user },
  } = req;

  if (req.method === "POST") {
    const isChat = Boolean(
      await client.chat.findFirst({
        where: {
          productId: Number(id),
          userId: user?.id,
        },
      })
    );

    if (isChat) {
      res.json({ ok: false });
    } else {
      const createChat = await client.chat.create({
        data: {
          user: { connect: { id: user?.id } },
          product: { connect: { id: Number(id) } },
        },
      });
      res.json({ ok: true, createChat });
    }
  }
  if (req.method === "GET") {
    const chatList = await client.chat.findMany({
      include: {
        messages: {
          select: {
            message: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    res.json({ ok: true, chatList });
  }
}

export default withApiSession(withHandler({ methods: ["POST", "GET"], handler }));
