import db from '../db'
import { workos, WorkosUser } from '../workos'

export const createUser = async (workosUser: WorkosUser) => {
    const org = await workos.organizations.createOrganization({
        name: `${workosUser.firstName || workosUser.email?.split('@')[0]}'s Workspace`
    })

    // Use transaction for workspace and user creation
    const { user: createdUser } = await db.$transaction(async (tx) => {
        const workspace = await tx.workspace.create({
            data: {
                name: org.name,
                extOrgId: org.id
            }
        })

        const user = await tx.user.create({
            data: {
                extAuthId: workosUser.id,
                email: workosUser.email,
                name:
                    `${workosUser.firstName} ${workosUser.lastName}`.trim() ||
                    workosUser.email?.split('@')[0],
                image: workosUser.profilePictureUrl,
                isAnonymous: false,
                workspaceId: workspace.id
            }
        })

        return { user }
    })

    await workos.userManagement.createOrganizationMembership({
        organizationId: org.id,
        userId: createdUser.extAuthId,
        roleSlug: 'admin'
    })

    return createdUser
}
