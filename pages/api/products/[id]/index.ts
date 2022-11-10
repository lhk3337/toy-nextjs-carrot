import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    body: { sellState },
    session: { user },
  } = req;
  if (req.method === "GET") {
    const product = await client.product.findUnique({
      where: { id: Number(id) },
      include: { productSeller: { select: { id: true, name: true, avatar: true } } },
    });

    const terms = product?.name.split(" ").map((word) => ({
      name: {
        contains: word,
      },
    }));
    const relatedProducts = await client.product.findMany({
      where: {
        OR: terms,
        AND: {
          id: {
            not: product?.id,
          },
        },
      },
    });

    const isLiked = Boolean(
      await client.record.findFirst({
        where: {
          productId: Number(id),
          userId: user?.id,
          kind: "Fav",
        },
        select: {
          id: true,
        },
      })
    );

    const chat = await client.chat.findFirst({
      where: { buyerId: user?.id, productId: Number(id) },
    });
    const chatId = chat?.id;

    res.json({ ok: true, product, chatId, isLiked, relatedProducts });
  }
  if (req.method === "POST") {
    if (sellState === "selling") {
      await client.product.update({
        where: { id: Number(id) },
        data: {
          sellState,
          productBuyerId: 0,
        },
      });
    }
    await client.product.update({
      where: { id: Number(id) },
      data: {
        sellState,
      },
    });

    res.json({ ok: true });
  }
}
export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
