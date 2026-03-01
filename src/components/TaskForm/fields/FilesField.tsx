import { useFormContext } from 'react-hook-form'
import { Field, Input, Text } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'

export function FilesField() {
  const { register, watch } = useFormContext<TaskFormValues>()
  const files = watch('files')

  return (
    <Field.Root>
      <Field.Label>Файлы</Field.Label>
      <Input
        type="file"
        multiple
        accept="*/*"
        {...register('files')}
      />
      {files && files.length > 0 && (
        <Text fontSize="xs" color="gray.500" mt={1}>
          Выбрано файлов: {files.length}
        </Text>
      )}
    </Field.Root>
  )
}