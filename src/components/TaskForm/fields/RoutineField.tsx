import { useState, useRef, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box, Field, Input, Textarea, Text, VStack, HStack } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'
import { ROUTINE_PERIODS } from '../../../constants/mockData'

export function RoutineField() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<TaskFormValues>()
  const isRoutine = watch('isRoutine')
  const routinePeriod = watch('routinePeriod')
  const [isPeriodOpen, setIsPeriodOpen] = useState(false)
  const periodRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (periodRef.current && !periodRef.current.contains(e.target as Node)) {
        setIsPeriodOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!isRoutine) return null

  const selectedPeriod = ROUTINE_PERIODS.find(p => p.value === routinePeriod)

  return (
    <Box
      border="1px dashed"
      borderColor="#7C3AED"
      borderRadius="lg"
      p={4}
      bg="white"
    >
      <VStack align="stretch" gap={3}>
        <Field.Root invalid={!!errors.routineName}>
          <Field.Label>
            <Text fontSize="xs" color="gray.500">Название рутинной задачи <span style={{ color: '#7C3AED' }}>★</span></Text>
          </Field.Label>
          <Box position="relative" w="full">
            <Input
              placeholder="Укажите название рутинной задачи"
              w="full"
              fontSize="sm"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              bg="white"
              _focus={{ borderColor: '#7C3AED', boxShadow: '0 0 0 1px #7C3AED' }}
              _placeholder={{ color: 'gray.300' }}
              {...register('routineName')}
            />
          </Box>
          <Field.ErrorText fontSize="xs">{errors.routineName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.routinePeriod}>
          <Field.Label>
            <Text fontSize="xs" color="gray.500">Периодичность <span style={{ color: '#7C3AED' }}>★</span></Text>
          </Field.Label>
          <Box position="relative" w="full" ref={periodRef}>
            <HStack
              border="1px solid"
              borderColor={errors.routinePeriod ? 'red.300' : isPeriodOpen ? '#7C3AED' : 'gray.200'}
              borderRadius="lg"
              px={3}
              py={2}
              bg="white"
              cursor="pointer"
              minH="40px"
              justify="space-between"
              onClick={() => setIsPeriodOpen(o => !o)}
            >
              <Text fontSize="sm" color={selectedPeriod ? 'gray.700' : 'gray.300'}>
                {selectedPeriod ? selectedPeriod.label : 'Выберите периодичность'}
              </Text>
              <Text color="gray.400" fontSize="sm">▾</Text>
            </HStack>

            {isPeriodOpen && (
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
                {ROUTINE_PERIODS.map(p => (
                  <Box
                    key={p.value}
                    px={3}
                    py={2}
                    fontSize="sm"
                    cursor="pointer"
                    bg={routinePeriod === p.value ? '#F5F3FF' : 'white'}
                    color={routinePeriod === p.value ? '#7C3AED' : 'gray.700'}
                    _hover={{ bg: 'gray.50' }}
                    onClick={() => {
                      setValue('routinePeriod', p.value, { shouldValidate: true })
                      setIsPeriodOpen(false)
                    }}
                  >
                    {p.label}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
          <Field.ErrorText fontSize="xs">{errors.routinePeriod?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.routineDescription}>
          <Field.Label>
            <Text fontSize="xs" color="gray.500">Описание</Text>
          </Field.Label>
          <Box position="relative" w="full">
            <Textarea
              placeholder="Описание рутинной задачи"
              w="full"
              resize="none"
              rows={3}
              fontSize="sm"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              bg="white"
              _focus={{ borderColor: '#7C3AED', boxShadow: '0 0 0 1px #7C3AED' }}
              _placeholder={{ color: 'gray.300' }}
              {...register('routineDescription')}
            />
          </Box>
          <Field.ErrorText fontSize="xs">{errors.routineDescription?.message}</Field.ErrorText>
        </Field.Root>
      </VStack>
    </Box>
  )
}
