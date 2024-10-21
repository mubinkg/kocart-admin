import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = (request.cookies.get('access_token'))
    const {pathname} = request.nextUrl
    if(!token && pathname !== '/admin/seller-signin' ){
        return NextResponse.redirect(new URL('/admin/seller-signin', request.url))
    }
    if(token && pathname === '/admin/seller-signin'){
        return  NextResponse.redirect(new URL('', request.url))
    }
    if(token && pathname === '/admin'){
        return NextResponse.redirect(new URL('/admin/kocart/dashboard', request.url))
    }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin', '/admin/seller-signin', '/admin/seller', '/admin/kocart/:param*'],
}