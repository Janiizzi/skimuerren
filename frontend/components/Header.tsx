import Link from 'next/link'
import React from 'react'
import { pages as page } from '@/lib/navigation'
import Image from 'next/image'

const Header = () => {
  return (
    <div className='flex p-4 mx-4'>
        <div className='flex-grow font-bold text-2xl'>
            <Link href='/' className='flex items-center gap-2'>
                <Image src='/skischule_muerren_de.png' alt='Skischule Mürren Logo' width={40} height={40} />
            </Link>
        </div>
        <nav className='flex gap-4 items-center'>
            {page.map((page) => (
                <Link key={page.path} href={page.path} className='text-black flex hover:bg-snowred/30 px-2 rounded-lg p-1'>
                    {page.name}
                </Link>
            ))}
        </nav>
    </div>
  )
}

export default Header