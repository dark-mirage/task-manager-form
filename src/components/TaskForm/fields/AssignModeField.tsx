import { useFormContext } from 'react-hook-form'
import { HStack, Text } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'

export function AssignModeField() {

  const { register } = useFormContext<TaskFormValues>()

  return (
    <HStack gap={4}>
      <HStack as="label" cursor="pointer" gap={2}>
        <input
          type="radio"
          value="members"
          {...register('assignMode')}
        />
        <Text fontSize="sm">Участники</Text>
      </HStack>

      <HStack as="label" cursor="pointer" gap={2}>
        <input
          type="radio"
          value="teams"
          {...register('assignMode')}
        />
        <Text fontSize="sm">Команды</Text>
      </HStack>
    </HStack>
  )
}