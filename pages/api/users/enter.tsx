import { NextApiRequest, NextApiResponse } from "next";

import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  let user;
  const {
    body: { email, phone },
  } = req;

  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("Found it.");
    if (!user) {
      console.log("Did not Found, will Create!");
      user = await client.user.create({
        data: { name: "Anonymous", email },
      });
    }
    console.log(user);
  }

  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log("Found it.");
    if (!user) {
      console.log("Did not Found, will Create!");
      user = await client.user.create({
        data: { name: "Anonymous", phone: +phone },
      });
    }
    console.log(user);
  }

  res.status(200).end();
}

export default withHandler("POST", handler);
