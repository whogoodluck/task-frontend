import { Status } from '@/types/task'
import { z } from 'zod'

function requiredString(fieldName: string) {
  return z
    .string()
    .trim()
    .min(1, { message: `${fieldName} is required` })
}

export const taskFormSchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  status: z.nativeEnum(Status),
})

export type TaskFormSchema = z.infer<typeof taskFormSchema>
