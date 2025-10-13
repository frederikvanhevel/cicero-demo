import { withAuth } from '@workos-inc/authkit-nextjs'
import { findUser } from './findUser'

export const getUserFromSession = async () => {
    const { user: workosUser } = await withAuth()
    if (!workosUser) return null
    return await findUser(workosUser.id)
}
