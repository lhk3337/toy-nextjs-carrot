import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { chatId },
    session: { user },
  } = req;

  if (req.method === "GET") {
    const reviews = await client.review.findMany({
      where: {
        createdForId: user?.id,
      },
      include: {
        createdBy: {
          select: {
            name: true,
            id: true,
            avatar: true,
          },
        },
      },
    });

    res.json({ ok: true, reviews });
  }
  if (req.method === "POST") {
    const isChat = await client.chat.findUnique({
      where: {
        id: chatId,
      },
      include: { product: { select: { productBuyerId: true, productSellerId: true } } },
    });

    const isReview = await client.review.findFirst({
      where: {
        chatId: isChat?.id,
        productId: isChat?.productId,
        createdForId: isChat?.product.productSellerId,
        createdById: isChat?.product.productBuyerId ? isChat?.product.productBuyerId : 0,
      },
    });

    if (isReview) {
      res.json({ ok: false });
    } else {
      const reviews = await client.review.create({
        data: {
          createdBy: { connect: { id: isChat?.product.productBuyerId ? isChat?.product.productBuyerId : 0 } },
          createdFor: { connect: { id: isChat?.product.productSellerId } },
          product: { connect: { id: isChat?.productId } },
          chat: { connect: { id: isChat?.id } },
          score: 0,
          review: "",
        },
      });
      res.json({ ok: true, reviews });
    }
  }
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
