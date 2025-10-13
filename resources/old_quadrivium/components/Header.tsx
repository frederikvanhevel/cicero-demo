import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { UserMenu } from './UserMenu'

interface HeaderProps {
    logo?: string
}

const Header: React.FC<HeaderProps> = ({ logo = 'Quadrivium.ai' }) => {
    return (
        <header className='w-full border-b border-gray-200 bg-white sticky top-0 z-50'>
            <div className='flex h-14 items-center px-4 sm:px-6 lg:px-8 relative w-full'>
                {/* Mobile menu button - visible on mobile only */}
                <div className='md:hidden flex items-center'>
                    <button
                        type='button'
                        className='text-gray-500 hover:text-gray-600 focus:outline-none'
                        aria-label='Toggle mobile menu'
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Logo - visible on all screens */}
                <div className='flex items-center'>
                    <Link
                        href='/'
                        className='text-lg font-semibold text-primary hover:text-primary/90 transition-colors flex flex-row items-center gap-2'
                    >
                        <Image
                            src='/logo.jpeg'
                            alt='Quadrivium.ai'
                            width={32}
                            height={32}
                        />
                        {logo}
                    </Link>
                </div>

                {/* User Menu */}
                <div className='flex items-center space-x-3 ml-auto'>
                    <UserMenu />
                </div>
            </div>
        </header>
    )
}

export default Header
