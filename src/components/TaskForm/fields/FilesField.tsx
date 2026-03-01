import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { Field, Text, Box, HStack } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'

export function FilesField() {
  const { register, watch } = useFormContext<TaskFormValues>()
  const files = watch('files')
  const inputRef = useRef<HTMLInputElement>(null)
  const { ref, ...rest } = register('files')

  const hasFiles = files && files.length > 0

  return (
    <Field.Root>
      <Field.Label>
        <Text fontSize="xs" color="gray.500">Файлы</Text>
      </Field.Label>
      <HStack
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        px={3}
        py={2}
        bg="white"
        cursor="pointer"
        minH="40px"
        width="100%"
        justify="space-between"
        onClick={() => inputRef.current?.click()}
      >
        <Text fontSize="sm" color={hasFiles ? 'gray.700' : 'gray.300'}>
          {hasFiles ? `Прикреплено файлов: ${files.length}` : 'Прикрепите файлы'}
        </Text>
        <Text fontSize="sm" color="gray.400">📎</Text>
      </HStack>
      <input
        type="file"
        multiple
        style={{ display: 'none' }}
        ref={(e) => {
          ref(e)
          inputRef.current = e
        }}
        {...rest}
      />
    </Field.Root>
  )
}
