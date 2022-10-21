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
        userId: user?.id,
      },
    })
  );

  if (req.method === "POST") {
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

  if (req.method === "GET") {
    res.json({ ok: true, isWriter });
  }
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
