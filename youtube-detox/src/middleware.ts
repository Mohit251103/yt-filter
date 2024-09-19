import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {

    const token = await getToken({ req });
    const username = cookies().get("username")?.value;
    const url = req.nextUrl;
    const pathname = url.pathname;
    if (token && (pathname === "/sign-in" || pathname === "/")) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    if (!token && pathname === "/dashboard") {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (pathname === "/dashboard" && !token?.username && !username) {
        return NextResponse.redirect(new URL('/profile/edit/?type=first-time', req.url));
    }

    if(pathname === "/profile/edit" && url.searchParams.get('type')==="first-time" && (token?.username || username)){
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/sign-in', '/dashboard', '/', '/profile/edit']
}