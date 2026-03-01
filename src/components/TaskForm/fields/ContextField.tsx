import { useFormContext } from 'react-hook-form'
import { Field, Textarea } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'

export function ContextField() {
  const { register, formState: { errors } } = useFormContext<TaskFormValues>()

  return (
    <Field.Root invalid={!!errors.context}>
      <Field.Label>Контекст задачи *</Field.Label>
      <Textarea
        placeholder="Выполнить какую-нибудь задачу"
        resize="none"
        rows={3}
        {...register('context')}
      />
      <Field.ErrorText>{errors.context?.message}</Field.ErrorText>
    </Field.Root>
  )
}