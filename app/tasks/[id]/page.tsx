import { getTask } from '@/services/task'
import { Dot } from 'lucide-react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import ManageTask from '@/components/manage-task'
import { Badge } from '@/components/ui/badge'
import { cn, formatTimeAgo } from '@/lib/utils'
import { Status, Task } from '@/types/task'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const task: Task | null = await getTask(id)

  return {
    title: task?.title || 'Task',
  }
}

interface TaskDetailsProps {
  params: Promise<{ id: string }>
}

export default async function page({ params }: TaskDetailsProps) {
  const { id } = await params
  const { data } = await getTask(id)

  const task: Task | null = data.task

  if (!task) redirect('/')
  return (
    <section className='mx-auto max-w-2xl p-4 pt-10'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold'>{task.title}</h1>

        <ManageTask task={task} />
      </div>

      {/* <Separator /> */}

      <div className='mt-4 space-y-6'>
        <article className='text-muted-foreground text-base'>{task.description}</article>

        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-wrap gap-2'>
            <Badge
              variant='outline'
              className={cn('flex items-center text-sm font-semibold text-[#f59f43]', {
                'text-[#28a745]': task.status === Status.IN_PROGRESS,
                'text-[#6c757d]': task.status === Status.COMPLETED,
              })}
            >
              {task.status}
            </Badge>
          </div>
          <div className='flex items-center text-sm'>
            <Dot size={24} className='text-foreground' />
            {formatTimeAgo(new Date(task.createdAt))}
          </div>
        </div>
      </div>
    </section>
  )
}
