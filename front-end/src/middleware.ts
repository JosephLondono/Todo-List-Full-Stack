import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/task", "/settings"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/auth"));
  }

  if (protectedRoutes.includes(pathname)) {
    console.log("middleware", "redirecting to /auth");

    return NextResponse.redirect(new URL("/auth", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/data|favicon.ico).*)"],
};
