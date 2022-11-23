import { NextFetchEvent, NextRequest, NextResponse, userAgent } from "next/server";

export const middleware = (req: NextRequest, ev: NextFetchEvent) => {
  if (userAgent(req).isBot) {
    // return new Response("Plz don't be a bot. Be human",{status:403});
  }

  if (!req.url.includes("/api")) {
    if (!req.cookies.has("carrotsession") && !req.url.includes("/enter")) {
      req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
      req.nextUrl.pathname = "/enter";
      return NextResponse.redirect(req.nextUrl);
    }
    if (req.cookies.has("carrotsession") && req.url.includes("/enter")) {
      req.nextUrl.pathname = "/";
      return NextResponse.redirect(req.nextUrl);
    }
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
