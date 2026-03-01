import { useFormContext } from 'react-hook-form'
import { HStack, Field, Input } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'

export function DueDateField() {
  const { register, formState: { errors } } = useFormContext<TaskFormValues>()

  return (
    <HStack gap={3} align="start">
      <Field.Root invalid={!!errors.dueDate} flex={1}>
        <Field.Label>Срок выполнения *</Field.Label>
        <Input type="date" {...register('dueDate')} />
        <Field.ErrorText>{errors.dueDate?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.dueTime} flex={1}>
        <Field.Label>Время *</Field.Label>
        <Input type="time" {...register('dueTime')} />
        <Field.ErrorText>{errors.dueTime?.message}</Field.ErrorText>
      </Field.Root>
    </HStack>
  )
}