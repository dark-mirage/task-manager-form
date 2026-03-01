import { useState, useRef, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Field, Text, Box, HStack } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'
import { MOCK_TOPICS } from '../../../constants/mockData'

export function TopicField() {
  const { watch, setValue, formState: { errors } } = useFormContext<TaskFormValues>()
  const topic = watch('topic')
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedTopic = MOCK_TOPICS.find(t => t.id === topic)

  return (
    <Field.Root invalid={!!errors.topic}>
      <Field.Label>
        <Text fontSize="xs" color="gray.500">Указать тему</Text>
      </Field.Label>
      <Box position="relative" width="100%" ref={ref}>
        <HStack
          border="1px solid"
          borderColor={errors.topic ? 'red.300' : isOpen ? '#7C3AED' : 'gray.200'}
          borderRadius="xl"
          px={3}
          py={2}
          bg="white"
          cursor="pointer"
          minH="40px"
          justify="space-between"
          onClick={() => setIsOpen(o => !o)}
        >
          <Text fontSize="sm" color={selectedTopic ? 'gray.700' : 'gray.300'}>
            {selectedTopic ? selectedTopic.label : 'Выберите тему'}
          </Text>
          <Text color="gray.400" fontSize="sm">▾</Text>
        </HStack>

        {isOpen && (
          <Box
            position="absolute"
            top="100%"
            left={0}
            right={0}
            mt={1}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            bg="white"
            boxShadow="lg"
            zIndex={20}
            overflow="hidden"
          >
            {MOCK_TOPICS.map(t => (
              <Box
                key={t.id}
                px={3}
                py={2}
                fontSize="sm"
                cursor="pointer"
                bg={topic === t.id ? '#F5F3FF' : 'white'}
                color={topic === t.id ? '#7C3AED' : 'gray.700'}
                _hover={{ bg: 'gray.50' }}
                onClick={() => {
                  setValue('topic', t.id, { shouldValidate: true })
                  setIsOpen(false)
                }}
              >
                {t.label}
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Field.ErrorText fontSize="xs">{errors.topic?.message}</Field.ErrorText>
    </Field.Root>
  )
}
