'use client'

import { cn } from '@/lib/utils'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '../ui/button'
import Logo from './logo'

function Header() {
  const pathname = usePathname()

  return (
    <header className='bg-background flex h-24 w-full items-center justify-between px-4 md:px-12'>
      <Logo />
      <div>
        <Link
          href={pathname === '/create-task' ? '/' : '/create-task'}
          className={cn(buttonVariants({ variant: 'secondary' }))}
        >
          {pathname !== '/create-task' ? 'Create Task' : 'Go Home'}
        </Link>
      </div>
    </header>
  )
}

export default Header
