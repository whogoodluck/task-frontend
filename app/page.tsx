'use client'

import { useTask } from '@/providers/task-provider'
import { useEffect, useState } from 'react'

import Loader from '@/components/loader'
import TaskCard from '@/components/task-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getTasks } from '@/services/task'
import { Status } from '@/types/task'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { tasks, setTasks } = useTask()

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIsLoading(true)
        const res = await getTasks({})
        setTasks(res.data.tasks)
      } catch (error) {
        console.log('err', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchIssues()
  }, [])

  const handleSelectStatus = async (value: Status) => {
    try {
      setIsLoading(true)
      const res = await getTasks({ status: value })
      setTasks(res.data.tasks)
    } catch (error) {
      console.log('err', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='p-4 md:px-12'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-primary text-3xl font-semibold'></h1>
        <div className='flex gap-4'>
          <Select onValueChange={handleSelectStatus}>
            <SelectTrigger className='w-full cursor-pointer'>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Status).map(status => (
                <SelectItem className='cursor-pointer' key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading ? (
        <Loader size='md' />
      ) : (
        <div className='flex w-full flex-col gap-4 py-4'>
          {!!tasks && tasks.map((task, index) => <TaskCard key={index} task={task} />)}
        </div>
      )}
    </section>
  )
}

export default Home
