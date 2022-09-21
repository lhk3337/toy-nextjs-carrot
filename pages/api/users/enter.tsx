import { NextApiRequest, NextApiResponse } from "next";

import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email, phone },
  } = req;
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: { ...payload },
    update: {},
    create: { name: "Anonymous", ...payload },
  });

  /* upsert과 object 조건문
  const user = await client.user.upsert({
    where: { ...(phone && { phone: +phone }), ...(email ? { email } : {}) },
    update: {},
    create: { name: "Anonymous", ...(phone && { phone: +phone }), ...(email ? { email } : {}) },
  });
*/

  /* if문과 upsert()
  let user
  if (phone) {
    user = await client.user.upsert({
      where: { phone: +phone },
      update: {},
      create: { name: "Anonymous", phone: +phone },
    });
  } else if (email) {
    user = await client.user.upsert({
      where: { email },
      update: {},
      create: { name: "Anonymous", email },
    });
  }
 */

  /*  if문
let user
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
  }
  */

  console.log(user);
  res.status(200).end();
}

export default withHandler("POST", handler);
