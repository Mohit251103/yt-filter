import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {

    const token = await getToken({ req });
    // console.log(token);
    const url = req.nextUrl;
    if (token && url.pathname.startsWith("/sign-in")) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    else if (!token && url.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    if (url.pathname.startsWith("/dashboard") && !token?.username) {

        
        return NextResponse.redirect(new URL('/profile/edit/?type=first-time', req.url));

    }
}

export const config = {
    matcher: ['/sign-in', '/dashboard', '/', '/profile/edit']
}