import { useFormContext } from 'react-hook-form'
import { HStack, Field, Input, Text, Box } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'

const hiddenPickerSx = {
  '&::-webkit-calendar-picker-indicator': { display: 'none', WebkitAppearance: 'none' },
  '&::-webkit-inner-spin-button': { display: 'none' },
  '&::-webkit-outer-spin-button': { display: 'none' },
  appearance: 'none',
} as const

export function DueDateField() {
  const { register, formState: { errors } } = useFormContext<TaskFormValues>()

  const inputStyles = {
    fontSize: 'sm',
    border: '1px solid',
    borderRadius: 'full',
    bg: 'white',
    px: 4,
    h: '36px',
    color: 'gray.500',
    sx: hiddenPickerSx,
    _focus: { borderColor: '#7C3AED', boxShadow: '0 0 0 1px #7C3AED' },
  }

  return (
    <Field.Root>
      <Field.Label>
        <Text fontSize="xs" color="gray.500">Срок выполнения</Text>
      </Field.Label>
      <HStack gap={2} align="center">
        <Box flex={1}>
          <Input
            type="date"
            {...inputStyles}
            borderColor={errors.dueDate ? 'red.300' : 'gray.200'}
            {...register('dueDate')}
          />
        </Box>
        <Box flex={1}>
          <Input
            type="time"
            defaultValue="00:00"
            {...inputStyles}
            borderColor={errors.dueTime ? 'red.300' : 'gray.200'}
            {...register('dueTime')}
          />
        </Box>
      </HStack>
      <Field.ErrorText fontSize="xs">{errors.dueDate?.message}</Field.ErrorText>
    </Field.Root>
  )
}
