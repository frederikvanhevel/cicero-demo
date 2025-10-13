import { Prisma } from 'q-prisma-client'
import db from '../db'

export type ListCases = Prisma.PromiseReturnType<typeof listCases>

export async function listCases(workspaceId: string) {
    const cases = await db.case.findMany({
        where: {
            workspaceId
        },
        select: {
            id: true,
            title: true,
            sector: true,
            createdAt: true,
            status: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return cases
}
