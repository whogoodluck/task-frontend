'use client'

import { Dot } from 'lucide-react'

import { cn, formatTimeAgo } from '@/lib/utils'
import { Status, Task } from '@/types/task'

import Link from 'next/link'
import ManageTask from './manage-task'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

interface TaskCardProps {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className=''>
      <CardHeader className='flex items-center justify-between'>
        <Link href={`/tasks/${task.id}`}>
          <CardTitle className='line-clamp-2'>{task.title}</CardTitle>
        </Link>
        <ManageTask task={task} />
      </CardHeader>
      <CardContent>
        <Link href={`/tasks/${task.id}`}>
          <article className='text-muted-foreground line-clamp-3 text-sm'>
            {task.description}
          </article>{' '}
        </Link>
      </CardContent>
      <CardFooter className='flex items-center gap-2'>
        <div
          className={cn('flex items-center text-sm font-semibold text-[#f59f43]', {
            'text-[#28a745]': task.status === Status.IN_PROGRESS,
            'text-[#6c757d]': task.status === Status.COMPLETED,
          })}
        >
          <Dot size={24} />
          {task.status}
        </div>
        <div className='flex items-center text-sm'>
          <Dot size={24} className='text-foreground' />
          {formatTimeAgo(new Date(task.createdAt))}
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskCard
