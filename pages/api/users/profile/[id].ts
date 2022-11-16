import { NextApiRequest, NextApiResponse } from "next";

import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
  } = req;
  const userProfile = await client.user.findUnique({
    where: { id: Number(id) },
  });

  const sellProducts = await client.product.findMany({
    where: { productSellerId: Number(id) },
    include: {
      _count: {
        select: {
          records: {
            where: {
              kind: { equals: "Fav" },
            },
          },
          chats: true,
        },
      },
    },
  });
  const buyProducts = await client.product.findMany({
    where: { productBuyerId: Number(id) },
    include: {
      _count: {
        select: {
          records: {
            where: {
              kind: { equals: "Fav" },
            },
          },
          chats: true,
        },
      },
    },
  });
  const Profiles = {
    userProfile,
    sellProducts: sellProducts.map((product) => {
      return { ...product, _count: { liked: product._count.records, chatCount: product._count.chats } };
    }),
    buyProducts: buyProducts.map((product) => {
      return { ...product, _count: { liked: product._count.records, chatCount: product._count.chats } };
    }),
  };
  res.json({ ok: true, Profiles });
}

export default withApiSession(withHandler({ methods: ["GET"], handler, isPrivate: false }));
