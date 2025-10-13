import { WorkOS, User as WorkosUser } from '@workos-inc/node'

const workos = new WorkOS(process.env.WORKOS_API_KEY!)

export { workos }
export type { WorkosUser }
