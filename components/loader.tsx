'use client'

import { Loader2Icon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
}

export default function Loader({ size = 'lg' }: LoaderProps) {
  return (
    <section
      className={cn('flex items-center justify-center', {
        'h-[calc(100vh-6rem)]': size === 'lg',
        'h-[calc(100vh-12rem)]': size === 'md',
        'h-[calc(100vh-16rem)]': size === 'sm',
      })}
    >
      <Loader2Icon className='text-primary h-10 w-10 animate-spin' />
    </section>
  )
}
