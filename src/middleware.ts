import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export type payloadType = {
  email: number;
  iat: number;
  exp: number;
};

export async function middleware(req: NextRequest) {
  const session = await auth();
  if (!session && req.nextUrl.pathname == "/dm") {
    const redirectUrl = new URL(`/login`, req.url);
    return NextResponse.redirect(redirectUrl);
  }
  if (session && req.nextUrl.pathname == "/login") {
    const redirectUrl = new URL(`/dm`, req.url);
    return NextResponse.redirect(redirectUrl);
  }
  // return NextResponse.next();
  // if (request.nextUrl.pathname.startsWith("/dm")) {
  //   const cookieStore = cookies();
  //   const token = cookieStore.get("chat-auth");
  //   if (!token) {
  //     return NextResponse.redirect(new URL(`/login`, request.url));
  //   }
  //   const { value } = token;
  //   try {
  //     const payload: JWTVerifyResult<payloadType> = await jwtVerify(
  //       value,
  //       new TextEncoder().encode(process.env.ACCESS_TOKEN)
  //     );
  //     if (payload.payload.email) return NextResponse.next();
  //   } catch (error) {
  //     return NextResponse.redirect(new URL(`/login`, request.url));
  //   }
  // }
  // if (request.nextUrl.pathname.startsWith("/login")) {
  //   const cookieStore = cookies();
  //   const token = cookieStore.get("chat-auth");
  //   if (!token) {
  //     return;
  //   }
  //   const { value } = token;
  //   try {
  //     await jwtVerify(
  //       value,
  //       new TextEncoder().encode(process.env.ACCESS_TOKEN)
  //     );
  //     return NextResponse.redirect(new URL(`/dm`, request.url));
  //   } catch (error) {
  //     return NextResponse.next();
  //   }
  // }
  // return NextResponse.next();
}

// export const config = {
//   matcher: ["/dm", "/login"],
// };
