import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <Link to="/" className='flex gap-2'>
                <img src="/images/logo.png" alt="logo" className='w-8 h-8' />
                <p className='text-2xl max-sm:hidden font-bold text-gradient'>BeyondCareer</p>
            </Link>
            <Link to={'/upload'}>
                <p className='primary-button w-fit max-md:hidden truncate'>Upload Resume</p>
                <p className='primary-button w-fit md:hidden truncate'>Upload</p>
            </Link>
        </nav>
    )
}

export default Navbar