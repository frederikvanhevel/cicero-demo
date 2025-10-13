import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { withAuth } from '@workos-inc/authkit-nextjs'
import { LogOut, Settings, User } from 'lucide-react'

export async function UserMenu() {
    const { user } = await withAuth()

    if (!user) return null

    // Get initials from user name
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none group'>
                <Avatar className='h-8 w-8 ring-1 ring-black/5 group-hover:ring-2 group-hover:ring-primary/20 transition-all duration-200'>
                    {user.profilePictureUrl ? (
                        <AvatarImage
                            src={user.profilePictureUrl}
                            alt={user.firstName!}
                            className='object-cover'
                        />
                    ) : (
                        <AvatarFallback className='bg-gradient-to-b from-primary/[0.08] to-primary/[0.12] text-primary/80 font-medium text-sm'>
                            {getInitials(user.firstName!)}
                        </AvatarFallback>
                    )}
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-64 p-2'>
                <DropdownMenuLabel className='font-normal px-2 pb-3'>
                    <div className='flex flex-col space-y-1.5'>
                        <p className='text-sm font-semibold leading-none text-gray-900'>
                            {user.firstName}
                        </p>
                        <p className='text-xs leading-none text-gray-500 font-normal'>
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className='mx-2' />
                <div className='p-1'>
                    <DropdownMenuItem className='cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-primary/[0.08] focus:bg-primary/[0.08] focus:text-primary'>
                        <User className='mr-2 h-4 w-4 text-gray-400' />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-primary/[0.08] focus:bg-primary/[0.08] focus:text-primary'>
                        <Settings className='mr-2 h-4 w-4 text-gray-400' />
                        <span>Settings</span>
                    </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className='mx-2' />
                <div className='p-1'>
                    <DropdownMenuItem
                        className='cursor-pointer rounded-md px-2 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-50/50 focus:bg-red-50/50'
                        // onClick={onLogout}
                    >
                        <LogOut className='mr-2 h-4 w-4 opacity-70' />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
