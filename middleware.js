import { NextResponse } from "next/server";

const protectedRoutes = ['/upcoming', '/personal-room', '/previous', '/recordings', '/'];

export default async function middleware(req) {
    const requestedPath = req.nextUrl.pathname;

    if (protectedRoutes.includes(requestedPath)) {
        try {
            const response = await fetch('http://localhost:3001/auth/validate-cookie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                return NextResponse.redirect(new URL('/sign-in', req.url));
            }
        } catch (error) {
            console.error('Error validating cookie:', error);
            return NextResponse.redirect(new URL('/sign-in', req.url));
        }
    }

    return NextResponse.next();
}
