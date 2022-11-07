import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    query: { id },
  } = req;
  const isWriter = Boolean(
    await client.product.findFirst({
      where: {
        id: Number(id),
        productSellerId: user?.id,
      },
    })
  );

  if (isWriter) {
    const delPost = await client.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ ok: true, delPost });
  } else {
    return;
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
