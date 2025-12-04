import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold text-red-500'>Hello World!</h1>
      <Button>Button</Button>
    </div>
  )
}
