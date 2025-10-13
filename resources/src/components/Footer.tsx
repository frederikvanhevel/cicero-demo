import Link from 'next/link'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='w-full border-t border-gray-200 bg-white py-6'>
            <div className='main-container'>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
                    {/* Company Info */}
                    <div className='space-y-3'>
                        <h4 className='text-base font-semibold text-primary'>
                            Quadrivium.ai
                        </h4>
                        <p className='text-sm text-gray-600'>
                            Advanced legal research and analysis powered by
                            artificial intelligence.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className='space-y-3'>
                        <h4 className='text-base font-semibold text-gray-900'>
                            Quick Links
                        </h4>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/cases'
                                    className='text-sm text-gray-600 hover:text-primary'
                                >
                                    My Cases
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/documents'
                                    className='text-sm text-gray-600 hover:text-primary'
                                >
                                    Documents
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/research'
                                    className='text-sm text-gray-600 hover:text-primary'
                                >
                                    Research
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className='space-y-3'>
                        <h4 className='text-base font-semibold text-gray-900'>
                            Resources
                        </h4>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/help'
                                    className='text-sm text-gray-600 hover:text-primary'
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/documentation'
                                    className='text-sm text-gray-600 hover:text-primary'
                                >
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/support'
                                    className='text-sm text-gray-600 hover:text-primary'
                                >
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className='space-y-3'>
                        <h4 className='text-base font-semibold text-gray-900'>
                            Legal
                        </h4>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='/privacy'
                                    className='text-sm text-gray-600 hover:text-primary'
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/terms'
                                    className='text-sm text-gray-600 hover:text-primary'
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className='mt-6 border-t border-gray-200 pt-6'>
                    <p className='text-center text-sm text-gray-600'>
                        © {currentYear} Quadrivium.ai. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
