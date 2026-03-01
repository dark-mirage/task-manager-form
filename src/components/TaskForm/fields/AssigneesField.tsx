import { useState, useRef, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Box, Field, Input, VStack,
  HStack, Text, Spinner, Badge, CloseButton
} from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'
import { useAssignees } from '../../../hooks/useAssignees'

export function AssigneesField() {
  const { watch, setValue, formState: { errors } } = useFormContext<TaskFormValues>()
  const assignMode = watch('assignMode')
  const selectedIds = watch('assignees')
  const [isOpen, setIsOpen] = useState(false)

  const { search, setSearch, results, isLoading } = useAssignees(assignMode)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggle = (id: string) => {
    if (selectedIds.includes(id)) {
      setValue('assignees', selectedIds.filter(a => a !== id), { shouldValidate: true })
    } else {
      setValue('assignees', [...selectedIds, id], { shouldValidate: true })
    }
  }

  const selectedItems = results.filter(r => selectedIds.includes(r.id))
  const visibleItems = selectedItems.slice(0, 1)
  const extraCount = selectedItems.length - 1

  return (
    <Field.Root invalid={!!errors.assignees}>
      <Field.Label>
        <Text fontSize="xs" color="gray.500">Исполнители задачи</Text>
      </Field.Label>

      <Box position="relative" width="100%" ref={containerRef}>
        <HStack
          border="1px solid"
          borderColor={errors.assignees ? 'red.300' : isOpen ? '#7C3AED' : 'gray.200'}
          borderRadius="lg"
          px={3}
          py={2}
          bg="white"
          cursor="pointer"
          minH="40px"
          justify="space-between"
          onClick={() => setIsOpen(o => !o)}
        >
          {selectedIds.length === 0 ? (
            <HStack gap={1}>
              <Text fontSize="sm" color="gray.300">Укажите исполнителей проекта</Text>
              <Text fontSize="sm" color="gray.400">▾</Text>
            </HStack>
          ) : (
            <HStack flex={1} gap={2} justify="space-between">
              <HStack gap={2} flexWrap="wrap">
                {visibleItems.map(item => (
                  <Badge
                    key={item.id}
                    bg="#F5F3FF"
                    color="#7C3AED"
                    border="1px solid #DDD6FE"
                    borderRadius="full"
                    px={2}
                    py={1}
                    fontSize="xs"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <Box w="16px" h="16px" borderRadius="full" bg="#7C3AED" display="inline-block" mr={1} />
                    {item.name}
                    <CloseButton size="xs" onClick={(e) => { e.stopPropagation(); toggle(item.id) }} />
                  </Badge>
                ))}
                {extraCount > 0 && (
                  <Text fontSize="xs" color="#7C3AED" fontWeight="500">
                    ещё {extraCount}
                  </Text>
                )}
              </HStack>
              <Text color="gray.400" fontSize="sm">▾</Text>
            </HStack>
          )}
        </HStack>

        {isOpen && (
          <Box
            position="absolute"
            top="100%"
            left={0}
            right={0}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            bg="white"
            boxShadow="lg"
            zIndex={20}
            mt={1}
          >
            <Box px={3} pt={2} pb={1}>
              <Input
                placeholder="Поиск..."
                fontSize="sm"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                px={3}
                py={1}
                h="32px"
                _focus={{ borderColor: '#7C3AED', boxShadow: '0 0 0 1px #7C3AED' }}
                _placeholder={{ color: 'gray.300' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onClick={e => e.stopPropagation()}
                autoFocus
              />
            </Box>
            <Box maxH="180px" overflowY="auto">
              {isLoading ? (
                <HStack p={3} justify="center">
                  <Spinner size="sm" color="#7C3AED" />
                </HStack>
              ) : results.length === 0 ? (
                <Text p={3} fontSize="sm" color="gray.400">Ничего не найдено</Text>
              ) : (
                <VStack gap={0} align="stretch">
                  {results.map(item => (
                    <HStack
                      key={item.id}
                      px={3}
                      py={2}
                      cursor="pointer"
                      bg={selectedIds.includes(item.id) ? '#F5F3FF' : 'white'}
                      _hover={{ bg: 'gray.50' }}
                      onClick={() => toggle(item.id)}
                    >
                      <Box
                        w="6px"
                        h="6px"
                        borderRadius="full"
                        border="2px solid"
                        borderColor={selectedIds.includes(item.id) ? '#7C3AED' : 'gray.300'}
                        bg={selectedIds.includes(item.id) ? '#7C3AED' : 'white'}
                      />
                      <Box w="24px" h="24px" borderRadius="full" bg="gray.200" />
                      <Text fontSize="sm" color="gray.700">{item.name}</Text>
                    </HStack>
                  ))}
                </VStack>
              )}
            </Box>
          </Box>
        )}
      </Box>

      <Field.ErrorText fontSize="xs">{errors.assignees?.message}</Field.ErrorText>
    </Field.Root>
  )
}
