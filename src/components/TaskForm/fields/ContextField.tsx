import { useFormContext } from 'react-hook-form'
import { Field, Textarea, Text, Box } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'

export function ContextField() {
  const { register, watch, formState: { errors } } = useFormContext<TaskFormValues>()
  const value = watch('context')

  return (
    <Field.Root invalid={!!errors.context}>
      <Field.Label>
        <Text fontSize="xs" color="gray.500">Контекст задачи <span style={{ color: '#7C3AED' }}>★</span></Text>
      </Field.Label>
      <Box position="relative" w="full">
        <Textarea
          placeholder="Выполнить какую-нибудь задачу"
          resize="none"
          rows={3}
          fontSize="sm"
          border="1px solid"
          borderColor={errors.context ? 'red.300' : 'gray.200'}
          borderRadius="lg"
          bg="white"
          pr={12}
          _focus={{ borderColor: '#7C3AED', boxShadow: '0 0 0 1px #7C3AED' }}
          _placeholder={{ color: 'gray.300' }}
          {...register('context')}
        />
        <Text
          position="absolute"
          bottom={2}
          right={3}
          fontSize="10px"
          color="gray.300"
        >
          {value?.length ?? 0}/256
        </Text>
      </Box>
      <Field.ErrorText fontSize="xs">{errors.context?.message}</Field.ErrorText>
    </Field.Root>
  )
}