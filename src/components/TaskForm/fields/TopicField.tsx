import { useFormContext } from 'react-hook-form'
import { Field, Text, Box } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'
import { MOCK_TOPICS } from '../../../constants/mockData'

export function TopicField() {
  const { register, formState: { errors } } = useFormContext<TaskFormValues>()

  return (
    <Field.Root invalid={!!errors.topic}>
      <Field.Label>
        <Text fontSize="xs" color="gray.500">Указать тему</Text>
      </Field.Label>
      <Box position="relative">
        <select
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: '8px',
            border: errors.topic ? '1px solid #FC8181' : '1px solid #E2E8F0',
            background: 'white',
            fontSize: '14px',
            color: '#718096',
            appearance: 'none',
          }}
          {...register('topic')}
        >
          <option value="">Выберите тему</option>
          {MOCK_TOPICS.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
        <Text
          position="absolute"
          right={3}
          top="50%"
          transform="translateY(-50%)"
          color="gray.400"
          fontSize="sm"
          pointerEvents="none"
        >
          ▾
        </Text>
      </Box>
      <Field.ErrorText fontSize="xs">{errors.topic?.message}</Field.ErrorText>
    </Field.Root>
  )
}