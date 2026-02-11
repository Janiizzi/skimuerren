import Link from 'next/link'
import React from 'react'
import { pages } from '@/lib/navigation'
import Image from 'next/image'

const Header = () => {
    return (
        <header className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-3xl bg-white/70 px-6 py-4 shadow-lg shadow-snowblue/10 backdrop-blur">
            <Link href="/" className="flex items-center gap-3 text-2xl font-semibold text-snowblue">
                <Image src="/skischule_muerren_de.png" alt="Skischule Mürren Logo" width={42} height={42} />
                Swiss Snow Happening 2026
            </Link>
            <nav className="flex items-center gap-3 text-sm font-semibold">
                {pages.map((page) => (
                    <Link
                        key={page.path}
                        href={page.path}
                        className="rounded-full px-4 py-2 text-slate-600 transition hover:bg-snowblue/15 hover:text-snowblue"
                    >
                        {page.name}
                    </Link>
                ))}
            </nav>
        </header>
    )
}

export default Header