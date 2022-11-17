import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import sendEmail from "@libs/server/email";

// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_TOKEN;

const { TWILIO_SID, TWILIO_TOKEN, PHONE_NUMBER, TWILIO_MSID } = process.env;

const twilioClient = twilio(TWILIO_SID, TWILIO_TOKEN);

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { email, phone },
  } = req;

  const user = phone ? { phone } : email && { email };
  if (!user) return res.status(400).json({ ok: false }); // phone, email이 없는경우 처리

  const payload = String(Math.random()).substring(2, 8);

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: { where: { ...user }, create: { name: "Anonymous", ...user } },
      },
    },
  });

  if (phone) {
    await twilioClient.messages.create({
      to: PHONE_NUMBER!,
      body: `캐럿마켓 인증번호는 ${payload} 입니다.`,
      messagingServiceSid: TWILIO_MSID,
    });
  } else if (email) {
    sendEmail(email, payload);
  }

  return res.json({
    ok: true,
  });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });

/* connect
const user = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: { ...payload },
    update: {},
    create: { name: "Anonymous", ...payload },
  });

  const token = await client.token.create({ data: { payload: "1234", user: { connect: { id: user.id } } } });
*/

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

// console.log(user);
