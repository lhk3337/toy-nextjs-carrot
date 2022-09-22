import { NextApiRequest, NextApiResponse } from "next";
export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}
export default function withHandler(
  methods: "GET" | "POST" | "DELETE",
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== methods) {
      return res.status(405).end();
    }
    try {
      handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

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
