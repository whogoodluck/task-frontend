'use '

import { TaskFormSchema } from '@/schemas/task.schema'
import { Status } from '@/types/task'
import axios from 'axios'

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks`

export const createTask = async (task: TaskFormSchema) => {
  const response = await axios.post(API_URL, task)
  return response.data
}

interface GetTasks {
  status?: Status
}

export const getTasks = async ({ status }: GetTasks) => {
  if (status) {
    const response = await axios.get(`${API_URL}?status=${status}`)
    return response.data
  }

  const response = await axios.get(API_URL)
  return response.data
}

export const getTask = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}

export const updateTask = async (id: number, task: TaskFormSchema) => {
  const response = await axios.put(`${API_URL}/${id}`, task)
  return response.data
}
