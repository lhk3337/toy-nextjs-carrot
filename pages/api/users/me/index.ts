import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({ where: { id: req.session.user?.id } });
    res.json({ ok: true, profile });
  }

  if (req.method === "POST") {
    const {
      session: { user },
      body: { email, phone, name, avatar },
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    // 백엔드에서 currentUser의 email과 Edit page에서 onSubmit한 email의 데이터가 같으면 검증과 이메일 업데이트를 하지 않는다.
    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );
      // alreadyExists변수는 백엔드의 데이터와 입력 데이터의 값이 같은면 true, 다르면 false를 출력한다.
      if (alreadyExists) {
        return res.json({ ok: false, error: "Email already exists. Please use another email." });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: { email },
      });
      res.json({ ok: true });
    }

    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        return res.json({ ok: false, error: "Phone number already exists. Please use another Phone number." });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: { phone },
      });
      res.json({ ok: true });
    }

    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }
    if (avatar) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: { avatar },
      });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
