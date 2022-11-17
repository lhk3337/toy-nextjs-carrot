import { NextApiRequest, NextApiResponse } from "next";
export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
type method = "GET" | "POST" | "DELETE";
interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({ methods, isPrivate = true, handler }: ConfigType) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "plz log in." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

/*
 API resolved without sending a response for /api/products, this may result in stalled requests.
 warning Message출력하여 handler()앞에 await 추가했더니 없어짐
*/

/*
HOF(Higher Order Function)
const withHand = function (value: number, handlers: (value: number) => number) {
  return handlers(handlers(value));
};
 // ============================================================

const handlers = function (value: number) {
  return value + 3;
};

console.log(withHand(7, handlers));
*/
