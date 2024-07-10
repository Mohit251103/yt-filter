import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {

    const token = await getToken({ req });
    const url = req.nextUrl;
    const absUrl = req.nextUrl.clone();
    if (token && url.pathname.startsWith("/sign-in")) {
        absUrl.pathname = "/dashboard"
        NextResponse.redirect(absUrl);
    }
    else {
        absUrl.pathname = "/"
        NextResponse.rewrite(absUrl)
    }
}

export const config = {
    matcher: ['/sign-in','/dashboard','/']
}