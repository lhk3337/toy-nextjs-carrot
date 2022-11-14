import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { Kind } from "@prisma/client";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    query: { kind },
  } = req;

  const recordsQuerys = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: kind as Kind,
    },
    include: {
      product: {
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
      },
    },
  });
  const products = recordsQuerys?.map((product) => {
    return {
      ...product,
      product: {
        ...product.product,
        _count: { liked: product.product._count.records, chatCount: product.product._count.chats },
      },
    };
  });
  //_count: {records : 1} 로 출력하여 records를 liked로 바꾸기 위해 products를 사용함

  res.json({ ok: true, [kind as string]: products });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
