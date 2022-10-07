import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === "GET") {
    const productquerys = await client.product.findMany({
      include: {
        _count: {
          select: {
            records: {
              where: {
                kind: { equals: "Fav" },
              },
            },
          },
        },
      },
    });
    const products = productquerys.map((product) => {
      return { ...product, _count: { liked: product._count.records } };
    });
    res.json({ ok: true, products });
  }
  if (req.method === "POST") {
    const {
      body: { name, price, description },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        imageUrl: "nice",
        user: { connect: { id: user?.id } },
      },
    });
    res.json({ ok: true, product });
  }
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
