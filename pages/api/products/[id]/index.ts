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
      const product = await client.product.findUnique({
        where: { id: Number(id) },
      });

      await client.record.deleteMany({
        where: { userId: product?.productSellerId, productId: product?.id, kind: "Sale" },
      });
      // 판매 상태가 판매중이면 판매된 상품 db를 삭제하기
      await client.record.deleteMany({
        where: {
          userId: product?.productBuyerId ? product.productBuyerId : 0,
          productId: product?.id,
          kind: "Purchase",
        },
      });
      // 판매 상태가 판매중이면 산 상품 상품 db를 삭제하기

      // 판매 상태가 판매중이면 product의 productBuyer를 초기화 시킴
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
