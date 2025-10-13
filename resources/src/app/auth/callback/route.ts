import { handleAuth } from '@workos-inc/authkit-nextjs'

export const GET = handleAuth({
    returnPathname: '/cases',
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})
