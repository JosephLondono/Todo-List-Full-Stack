import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/tasks", "/settings"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  console.log("middleware", { token, pathname });

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl.origin));
  }

  if (token && pathname === "/auth") {
    return NextResponse.redirect(new URL("/tasks", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/data|favicon.ico).*)"],
};
