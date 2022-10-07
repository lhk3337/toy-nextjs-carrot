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

  const KindValue = (kind: string) => {
    if (kind === "fav") return "Fav";
    if (kind === "purchase") return "Purchase";
    if (kind === "sale") return "Sale";
  };

  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: KindValue(kind as Kind),
    },
    include: {
      product: true,
    },
  });
  res.json({ ok: true, [kind as string]: records });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
