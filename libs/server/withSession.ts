import { withIronSessionApiRoute } from "iron-session/next";
declare module "iron-session" {
  interface IronSessionData {
    user?: { id: number };
  }
}
export const cookieOption = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOption);
}
