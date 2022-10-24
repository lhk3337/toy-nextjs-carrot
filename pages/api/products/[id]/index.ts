import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    session: { user },
  } = req;
  const product = await client.product.findUnique({
    where: { id: Number(id) },
    include: { user: { select: { id: true, name: true, avatar: true } } },
  });
  const chat = await client.chat.findFirst({
    where: { userId: user?.id, productId: Number(id) },
  });
  const chatId = chat?.id;
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
  res.json({ ok: true, product, chatId, isLiked, relatedProducts });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
