import db from '../db'

export async function findUser(workosId: string) {
    const user = await db.user.findUnique({
        where: {
            extAuthId: workosId
        }
    })

    return user
}
