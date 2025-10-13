'use server'

import { createUser } from '@/lib/server/users/createUser'
import { findUser } from '@/lib/server/users/findUser'
import { withAuth } from '@workos-inc/authkit-nextjs'

interface Props {
    ensureSignedIn?: boolean
}

export async function getAuth({ ensureSignedIn = false }: Props) {
    const authResult = ensureSignedIn
        ? await withAuth({ ensureSignedIn: true })
        : await withAuth({ ensureSignedIn: false })

    const { user: workosUser, accessToken } = authResult

    if (!workosUser) {
        return { user: null }
    }

    let user = await findUser(workosUser.id)

    if (!user) {
        user = await createUser(workosUser)
    }

    return {
        user,
        accessToken
    }
}
