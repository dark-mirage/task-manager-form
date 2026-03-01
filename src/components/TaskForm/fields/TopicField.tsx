import { useFormContext } from 'react-hook-form'
import { Field } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'
import { MOCK_TOPICS } from '../../../constants/mockData'

export function TopicField() {
  const { register, formState: { errors } } = useFormContext<TaskFormValues>()

  return (
    <Field.Root invalid={!!errors.topic}>
      <Field.Label>Указать тему *</Field.Label>
      <select
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #E2E8F0',
          background: 'white',
          fontSize: '14px',
        }}
        {...register('topic')}
      >
        <option value="">Выберите тему</option>
        {MOCK_TOPICS.map(t => (
          <option key={t.id} value={t.id}>{t.label}</option>
        ))}
      </select>
      <Field.ErrorText>{errors.topic?.message}</Field.ErrorText>
    </Field.Root>
  )
}