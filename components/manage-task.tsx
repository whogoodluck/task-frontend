'use client'

import { useTask } from '@/providers/task-provider'
import { deleteTask } from '@/services/task'
import { EditIcon, Ellipsis, Loader2Icon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Task } from '@/types/task'

import { usePathname, useRouter } from 'next/navigation'
import TaskForm from './task-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { buttonVariants } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog'

function ManageTask({ task }: { task: Task }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { tasks, setTasks } = useTask()
  const pathname = usePathname()
  const router = useRouter()

  const handleDeleteTask = async () => {
    try {
      setIsDeleting(true)
      const res = await deleteTask(task.id)
      setTasks(tasks.filter(task => task.id !== res.data.task.id))
      if (pathname !== '/') router.push('/')
      toast.success('Task deleted successfully.')
    } catch {
      toast.error('Something went wrong, please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='text-primary cursor-pointer outline-none'>
          <Ellipsis strokeWidth={3} className='' />
          <span className='sr-only'>Toggle task menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-2'>
        <AlertDialog>
          <AlertDialogTrigger className='flex cursor-pointer items-center gap-2'>
            {isDeleting ? (
              <>
                <Loader2Icon size={16} className='text-destructive h-4 w-4 animate-spin' />{' '}
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} className='text-destructive' /> Delete
              </>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this task from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteTask}
                className={cn(buttonVariants({ variant: 'destructive' }))}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog>
          <DialogTrigger className='flex cursor-pointer items-center gap-2'>
            <EditIcon size={16} /> Edit
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className='text-center'>Update Task</DialogTitle>
            <DialogDescription>
              <TaskForm formType='update' task={task} />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ManageTask
