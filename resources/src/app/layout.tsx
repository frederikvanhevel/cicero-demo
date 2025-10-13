import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const manrope = Manrope({
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'Quadrivium.ai | Advanced Legal Research & Analysis',
    description:
        'Empower your legal practice with AI-driven research and analysis tools.',
    keywords:
        'legal research, AI legal assistant, law firm software, legal analysis'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en' className='h-full'>
            <body
                className={`${manrope.className} h-full bg-background text-foreground antialiased`}
            >
                <div className='flex flex-col min-h-screen'>
                    <Header />

                    <div className='flex flex-1'>
                        {/* Sidebar - hidden on mobile */}
                        <Sidebar className='hidden md:flex h-[calc(100vh-3.5rem)] top-14 fixed z-30' />

                        {/* Main content area */}
                        <main className='flex-grow md:ml-56 w-full'>
                            <div className='w-full h-full'>
                                <AuthKitProvider>
                                    <Providers>{children}</Providers>
                                </AuthKitProvider>
                            </div>
                        </main>
                    </div>
                </div>
            </body>
        </html>
    )
}
