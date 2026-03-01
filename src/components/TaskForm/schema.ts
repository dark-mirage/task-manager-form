import { z } from 'zod'

export const taskSchema = z.object({
  context: z.string().min(1, 'Контекст задачи обязателен'),

  assignMode: z.enum(['members', 'teams']),

  isRoutine: z.boolean(),

  routinePeriod: z.string().optional(),
  routineDescription: z.string().optional(),
  routineName: z.string().optional(),

  assignees: z.array(z.string()).min(1, 'Выберите хотя бы одного исполнителя'),

  dueDate: z.string().min(1, 'Укажите дату'),
  dueTime: z.string().min(1, 'Укажите время'),

  topic: z.string().min(1, 'Укажите тему'),

  tags: z.array(z.string()).min(1, 'Выберите хотя бы один тег'),

  files: z.any().optional(),
})

export type TaskFormValues = z.infer<typeof taskSchema>

