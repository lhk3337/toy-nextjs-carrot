import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    query: { id },
    body: { review, starRating },
  } = req;

  const reviewData = await client.review.findUnique({
    where: { id: Number(id) },
  });
  if (req.method === "GET") {
    res.json({ ok: true, reviewData });
  }

  if (req.method === "POST") {
    await client.review.update({
      where: { id: Number(id) },
      data: { review, score: starRating },
    });
    res.json({ ok: true });
  }
}
// 리뷰 남기기 페이지에서 리뷰 내용이 업데이트 됨
export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
