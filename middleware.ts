import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = (request.cookies.get('access_token'))
    const {pathname} = request.nextUrl
    if(!token && pathname !== '/authentication/seller-signin' ){
        return NextResponse.redirect(new URL('/authentication/seller-signin', request.url))
    }
    if(token && pathname === '/authentication/seller-signin'){
        return  NextResponse.redirect(new URL('/', request.url))
    }
    if(token && pathname === '/'){
        return NextResponse.redirect(new URL('/kocart/dashboard', request.url))
    }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/authentication/seller-signin', '/seller', '/kocart/:param*'],
}