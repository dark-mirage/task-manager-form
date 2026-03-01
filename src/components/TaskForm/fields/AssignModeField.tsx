import { useFormContext } from 'react-hook-form'
import { HStack, Text, Box } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'

export function AssignModeField() {
  const { register, watch, setValue } = useFormContext<TaskFormValues>()
  const assignMode = watch('assignMode')
  const isTeams = assignMode === 'teams'

  const toggle = () => {
    setValue('assignMode', isTeams ? 'members' : 'teams')
  }

  return (
    <HStack gap={3}>
      <HStack gap={2} cursor="pointer" onClick={toggle}>
        <Box
          w="36px"
          h="20px"
          borderRadius="full"
          bg={isTeams ? '#7C3AED' : 'gray.300'}
          position="relative"
          transition="background 0.2s"
        >
          <Box
            position="absolute"
            top="2px"
            left={isTeams ? '18px' : '2px'}
            w="16px"
            h="16px"
            borderRadius="full"
            bg="white"
            boxShadow="sm"
            transition="left 0.2s"
          />
        </Box>
        <Text fontSize="xs" color="gray.500">Назначить на команду</Text>
      </HStack>

      <input type="hidden" {...register('assignMode')} />
    </HStack>
  )
}
