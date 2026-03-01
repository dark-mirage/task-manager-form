import { useState, useRef, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Field, Text, Box, HStack, Wrap } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'
import { MOCK_TAGS } from '../../../constants/mockData'

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  orange: { bg: '#FED7AA', color: '#9A3412' },
  red:    { bg: '#FECaCA', color: '#991B1B' },
  purple: { bg: '#E9D5FF', color: '#6B21A8' },
  gray:   { bg: '#E5E7EB', color: '#374151' },
}

export function TagsField() {
  const { watch, setValue, formState: { errors } } = useFormContext<TaskFormValues>()
  const selectedTags = watch('tags')
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

  const toggle = (id: string) => {
    if (selectedTags.includes(id)) {
      setValue('tags', selectedTags.filter(t => t !== id), { shouldValidate: true })
    } else {
      setValue('tags', [...selectedTags, id], { shouldValidate: true })
    }
  }

  const selectedTagObjects = MOCK_TAGS.filter(t => selectedTags.includes(t.id))

  return (
    <Field.Root invalid={!!errors.tags}>
      <Field.Label>
        <Text fontSize="xs" color="gray.500">Теги</Text>
      </Field.Label>
      <Box position="relative" width="100%" ref={ref}>
        <HStack
          border="1px solid"
          borderColor={errors.tags ? 'red.300' : isOpen ? '#7C3AED' : 'gray.200'}
          borderRadius="lg"
          px={3}
          py={2}
          bg="white"
          cursor="pointer"
          minH="40px"
          justify="space-between"
          align="center"
          onClick={() => setIsOpen(o => !o)}
        >
          {selectedTagObjects.length === 0 ? (
            <Text fontSize="sm" color="gray.300">Выберите теги</Text>
          ) : (
            <Wrap gap={1} flex={1}>
              {selectedTagObjects.map(tag => {
                const c = TAG_COLORS[tag.color] ?? TAG_COLORS.gray
                return (
                  <Box
                    key={tag.id}
                    px={2}
                    py="2px"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="500"
                    bg={c.bg}
                    color={c.color}
                  >
                    {tag.label}
                  </Box>
                )
              })}
            </Wrap>
          )}
          <Text color="gray.400" fontSize="sm" flexShrink={0}>▾</Text>
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
            {MOCK_TAGS.map(tag => {
              const c = TAG_COLORS[tag.color] ?? TAG_COLORS.gray
              const isSelected = selectedTags.includes(tag.id)
              return (
                <HStack
                  key={tag.id}
                  px={3}
                  py={2}
                  cursor="pointer"
                  bg={isSelected ? '#F5F3FF' : 'white'}
                  _hover={{ bg: 'gray.50' }}
                  justify="space-between"
                  onClick={() => toggle(tag.id)}
                >
                  <Box
                    px={2}
                    py="2px"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="500"
                    bg={c.bg}
                    color={c.color}
                  >
                    {tag.label}
                  </Box>
                  {isSelected && (
                    <Text fontSize="xs" color="#7C3AED" fontWeight="bold">✓</Text>
                  )}
                </HStack>
              )
            })}
          </Box>
        )}
      </Box>
      <Field.ErrorText fontSize="xs">{errors.tags?.message}</Field.ErrorText>
    </Field.Root>
  )
}
