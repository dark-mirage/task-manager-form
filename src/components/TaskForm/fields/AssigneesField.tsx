import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Box,
  Field,
  Input,
  VStack,
  HStack,
  Text,
  Spinner,
  Badge,
  CloseButton,
} from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'
import { useAssignees } from '../../../hooks/useAssignees'

export function AssigneesField() {
  const { watch, setValue, formState: { errors } } = useFormContext<TaskFormValues>()
  const assignMode = watch('assignMode')
  const selectedIds = watch('assignees')
  const [isOpen, setIsOpen] = useState(false)

  const { search, setSearch, results, isLoading } = useAssignees(assignMode)

  const toggle = (id: string) => {
    if (selectedIds.includes(id)) {
      setValue('assignees', selectedIds.filter(a => a !== id), { shouldValidate: true })
    } else {
      setValue('assignees', [...selectedIds, id], { shouldValidate: true })
    }
  }

  const selectedItems = results.filter(r => selectedIds.includes(r.id))

  return (
    <Field.Root invalid={!!errors.assignees}>
      <Field.Label>Исполнители задачи *</Field.Label>

      {selectedIds.length > 0 && (
        <HStack flexWrap="wrap" mb={2}>
          {selectedItems.map(item => (
            <Badge key={item.id} colorPalette="purple" px={2} py={1}>
              {item.name}
              <CloseButton
                size="xs"
                ml={1}
                onClick={() => toggle(item.id)}
              />
            </Badge>
          ))}
        </HStack>
      )}

      <Input
        placeholder={assignMode === 'members' ? 'Укажите исполнителей' : 'Укажите команду'}
        value={search}
        onChange={e => {
          setSearch(e.target.value)
          setIsOpen(true)
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />

      {isOpen && (
        <Box
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          w="full"
          maxH="200px"
          overflowY="auto"
          bg="white"
          zIndex={10}
          position="relative"
        >
          {isLoading ? (
            <HStack p={3} justify="center">
              <Spinner size="sm" />
            </HStack>
          ) : results.length === 0 ? (
            <Text p={3} fontSize="sm" color="gray.500">Ничего не найдено</Text>
          ) : (
            <VStack gap={0} align="stretch">
              {results.map(item => (
                <HStack
                  key={item.id}
                  px={3}
                  py={2}
                  cursor="pointer"
                  bg={selectedIds.includes(item.id) ? 'purple.50' : 'white'}
                  _hover={{ bg: 'gray.50' }}
                  onClick={() => toggle(item.id)}
                >
                  <input
                    type="checkbox"
                    readOnly
                    checked={selectedIds.includes(item.id)}
                  />
                  <Text fontSize="sm">{item.name}</Text>
                </HStack>
              ))}
            </VStack>
          )}
        </Box>
      )}

      <Field.ErrorText>{errors.assignees?.message}</Field.ErrorText>
    </Field.Root>
  )
}