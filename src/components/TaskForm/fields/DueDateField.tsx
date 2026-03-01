import { useFormContext } from 'react-hook-form'
import { HStack, Field, Input, Text, Box } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'

export function DueDateField() {
  const { register, formState: { errors } } = useFormContext<TaskFormValues>()

  return (
    <Field.Root>
      <Field.Label>
        <Text fontSize="xs" color="gray.500">Срок выполнения</Text>
      </Field.Label>
      <HStack gap={2} align="center">
        <Box flex={1}>
          <Input
            type="number"
            min={0}
            defaultValue={0}
            fontSize="sm"
            border="1px solid"
            borderColor={errors.dueDate ? 'red.300' : 'gray.200'}
            borderRadius="full"
            bg="white"
            _focus={{ borderColor: '#7C3AED', boxShadow: '0 0 0 1px #7C3AED' }}
            {...register('dueDate')}
          />
        </Box>
        <Box flex={1}>
          <Input
            type="time"
            defaultValue="00:00"
            fontSize="sm"
            border="1px solid"
            borderColor={errors.dueTime ? 'red.300' : 'gray.200'}
            borderRadius="full"
            bg="white"
            _focus={{ borderColor: '#7C3AED', boxShadow: '0 0 0 1px #7C3AED' }}
            {...register('dueTime')}
          />
        </Box>
        <Box
          w="36px"
          h="36px"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          flexShrink={0}
          _hover={{ borderColor: '#7C3AED' }}
        >
          <Text fontSize="md">📅</Text>
        </Box>
      </HStack>
      <Field.ErrorText fontSize="xs">{errors.dueDate?.message}</Field.ErrorText>
    </Field.Root>
  )
}