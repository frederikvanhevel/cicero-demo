import { getAuth } from '@/lib/server/auth/getAuth'
import { listCases } from '@/lib/server/cases/listCases'
import {
    dehydrate,
    HydrationBoundary,
    QueryClient
} from '@tanstack/react-query'
import CasesList from './components/CasesList'

export default async function CasesPage() {
    const { user } = await getAuth({ ensureSignedIn: true })
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['cases'],
        queryFn: () => listCases(user!.workspaceId)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className='h-[calc(100vh-64px)] flex flex-col w-full'>
                <div className='flex-1 overflow-auto w-full'>
                    <CasesList />
                </div>
            </div>
        </HydrationBoundary>
    )
}
