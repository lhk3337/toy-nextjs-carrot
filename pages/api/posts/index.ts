import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    const post = await client.post.create({
      data: { question, latitude, longitude, user: { connect: { id: user?.id } } },
    });
    res.json({ ok: true, post });
  }
  if (req.method === "GET") {
    const {
      query: { latitude, longitude },
    } = req;
    //pages - community - index.tsx에서, useCoords의 latitude, longitude값(현재 위치)을 useSWR의 query로 받아옴

    if (!latitude || !longitude) return;

    const parsedLatitude = parseFloat(latitude.toString());
    const parsedLongitude = parseFloat(longitude.toString());
    // community - write.tsx에서 useCoords의 latitude, longitude값과 question값이 저장된 posts db의 데이터를 불러옴
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wonderings: true,
            answers: true,
          },
        },
      },
      //posts DB의 latitude와 longitude의 범위에 해당하는 db데이터만 찾기 gte: 크거나 같다. lte: 작거나 같다.
      where: {
        latitude: {
          gte: parsedLatitude - 0.01,
          lte: parsedLatitude + 0.01,
        },
        longitude: {
          gte: parsedLongitude - 0.01,
          lte: parsedLongitude + 0.01,
        },
      },
    });

    res.json({ ok: true, posts });
  }
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
