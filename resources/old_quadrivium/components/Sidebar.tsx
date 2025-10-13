'use client'

import { cn } from '@/lib/utils'
import {
    BookOpen,
    FileText,
    FolderOpen,
    Home,
    Search,
    Settings,
    Users
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarItemProps {
    href: string
    icon: React.ReactNode
    label: string
}

const SidebarItem = ({ href, icon, label }: SidebarItemProps) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all',
                isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
            )}
        >
            <span className='h-5 w-5'>{icon}</span>
            <span>{label}</span>
        </Link>
    )
}

interface SidebarProps {
    className?: string
}

const Sidebar = ({ className }: SidebarProps) => {
    return (
        <aside
            className={cn(
                'flex w-56 flex-col border-r bg-white px-4 py-4 overflow-y-auto',
                className
            )}
        >
            <nav className='space-y-1'>
                <SidebarItem
                    href='/'
                    icon={<Home size={18} />}
                    label='Dashboard'
                />
                <SidebarItem
                    href='/cases'
                    icon={<FolderOpen size={18} />}
                    label='My Cases'
                />
                <SidebarItem
                    href='/documents'
                    icon={<FileText size={18} />}
                    label='Documents'
                />
                <SidebarItem
                    href='/research'
                    icon={<Search size={18} />}
                    label='Research'
                />
                <SidebarItem
                    href='/library'
                    icon={<BookOpen size={18} />}
                    label='Library'
                />
            </nav>

            <div className='mt-auto space-y-1 pt-6 border-t border-gray-100'>
                <SidebarItem
                    href='/settings'
                    icon={<Settings size={18} />}
                    label='Settings'
                />
                <SidebarItem
                    href='/team'
                    icon={<Users size={18} />}
                    label='Team'
                />
            </div>
        </aside>
    )
}

export default Sidebar
