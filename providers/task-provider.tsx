'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

import { Task } from '@/types/task'

interface TasksContextType {
  tasks: Task[]
  setTasks: Dispatch<SetStateAction<Task[]>>
}

const TasksContext = createContext<TasksContextType>({
  tasks: [],
  setTasks: () => [],
})

interface TaskProviderProps {
  children: ReactNode
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([])

  return <TasksContext.Provider value={{ tasks, setTasks }}>{children}</TasksContext.Provider>
}

export const useTask = () => {
  return useContext(TasksContext)
}
