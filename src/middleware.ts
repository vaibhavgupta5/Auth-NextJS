import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    console.log(path)
    const isPublicPath = path === '/login' || '/SignUp' || '/verifyemail'

    const token = request.cookies.get("token")?.value || ""

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}
 
// match krega url loction or upar wala function run kar dega before executing
export const config = {
  matcher: [
    "/",
    "/login",
    "/SignUp",
    "/profile",
    "/verifyemail"
  ],
}