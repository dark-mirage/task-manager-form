import { useFormContext } from 'react-hook-form'
import { Box, Field, Input, Textarea, Text, VStack, HStack } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'
import { ROUTINE_PERIODS } from '../../../constants/mockData'

export function RoutineField() {
  const { register, watch, formState: { errors } } = useFormContext<TaskFormValues>()
  const isRoutine = watch('isRoutine')

  return (
    <VStack align="stretch" gap={3}>
      <HStack as="label" cursor="pointer" gap={2}>
        <input type="checkbox" {...register('isRoutine')} />
        <Text fontSize="sm">Рутинная задача</Text>
      </HStack>

      {isRoutine && (
        <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="md" bg="gray.50">
          <VStack align="stretch" gap={3}>
            <Field.Root invalid={!!errors.routinePeriod}>
              <Field.Label>Периодичность</Field.Label>
              <select
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #E2E8F0', background: 'white', fontSize: '14px' }}
                {...register('routinePeriod')}
              >
                <option value="">Выберите периодичность</option>
                {ROUTINE_PERIODS.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <Field.ErrorText>{errors.routinePeriod?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.routineDescription}>
              <Field.Label>Описание</Field.Label>
              <Textarea placeholder="Описание рутинной задачи" resize="none" rows={3} bg="white" {...register('routineDescription')} />
              <Field.ErrorText>{errors.routineDescription?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.routineName}>
              <Field.Label>Название рутинной задачи</Field.Label>
              <Input placeholder="Укажите название рутинной задачи" bg="white" {...register('routineName')} />
              <Field.ErrorText>{errors.routineName?.message}</Field.ErrorText>
            </Field.Root>
          </VStack>
        </Box>
      )}
    </VStack>
  )
}