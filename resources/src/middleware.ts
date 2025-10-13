import { authkitMiddleware } from '@workos-inc/authkit-nextjs'

export default authkitMiddleware({ debug: true })

export const config = {
    matcher: [
        '/',
        '/workspace/:path*',
        '/api/:path*',
        '/((?!_next/static|_next/image|favicon.ico|.*\\.css).*)'
    ]
}
