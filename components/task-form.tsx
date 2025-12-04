'use client'

import { useTask } from '@/providers/task-provider'
import { taskFormSchema, TaskFormSchema } from '@/schemas/task.schema'
import { createTask, updateTask } from '@/services/task'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Status, Task } from '@/types/task'

import { useRouter } from 'next/navigation'
import LoadingButton from './common/loading-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'

interface TaskFormProps {
  formType?: 'create' | 'update'
  task?: Task
}

function TaskForm({ formType = 'create', task }: TaskFormProps) {
  const [isPending, setIsPending] = useState(false)
  const { tasks, setTasks } = useTask()
  const router = useRouter()

  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      status: task?.status || undefined,
    },
  })

  const onSubmit = async (data: TaskFormSchema) => {
    try {
      setIsPending(true)
      if (formType === 'update' && !!task) {
        const res = await updateTask(task.id, data)
        setTasks(tasks.map(task => (task.id === res.data.task.id ? res.data.task : task)))
        return
      }

      const res = await createTask(data)
      setTasks([res.task, ...tasks])
      toast.success(`Task ${formType}d successfully.`)
      router.push('/')
    } catch {
      toast.error('Something went wrong, please try again.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='my-8 space-y-6'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter Task title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Describe the task...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className='w-full cursor-pointer'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(Status).map(status => (
                      <SelectItem className='cursor-pointer' key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <LoadingButton
          size='lg'
          className='mt-4 w-full'
          text={formType === 'update' ? 'Update' : 'Create'}
          loading={isPending}
          variant='secondary'
          type='submit'
        />
      </form>
    </Form>
  )
}

export default TaskForm
