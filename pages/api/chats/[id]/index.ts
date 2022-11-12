import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    body: { sellState },
  } = req;
  if (req.method === "GET") {
    const chat = await client.chat.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        review: { select: { id: true } },
        messages: {
          select: { message: true, createdAt: true, id: true, user: { select: { avatar: true, id: true } } },
        },
        product: {
          select: {
            price: true,
            imageUrl: true,
            name: true,
            id: true,
            sellState: true,
            productBuyerId: true,
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
  if (req.method === "POST") {
    const chat = await client.chat.findUnique({
      where: { id: Number(id) },
    });
    if (sellState === "sold") {
      await client.product.update({
        where: { id: chat?.productId },
        data: {
          productBuyerId: chat?.buyerId,
          sellState,
        },
      });
      await client.record.create({
        data: {
          user: { connect: { id: chat?.sellerId } },
          product: { connect: { id: chat?.productId } },
          kind: "Sale",
        },
      });
      await client.record.create({
        data: {
          user: { connect: { id: chat?.buyerId } },
          product: { connect: { id: chat?.productId } },
          kind: "Purchase",
        },
      });
    }
    if (sellState === "selling") {
      await client.product.update({
        where: { id: chat?.productId },
        data: {
          productBuyerId: 0,
          sellState,
        },
      });
      await client.record.deleteMany({ where: { userId: chat?.sellerId, productId: chat?.productId, kind: "Sale" } });
      await client.record.deleteMany({
        where: { userId: chat?.buyerId, productId: chat?.productId, kind: "Purchase" },
      });
    }
  }
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
