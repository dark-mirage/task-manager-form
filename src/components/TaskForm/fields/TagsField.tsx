import { useFormContext } from 'react-hook-form'
import { Field, HStack, Badge } from '@chakra-ui/react'
import type { TaskFormValues } from '../schema'
import { MOCK_TAGS } from '../../../constants/mockData'

export function TagsField() {
  const { watch, setValue, formState: { errors } } = useFormContext<TaskFormValues>()
  const selectedTags = watch('tags')

  const toggle = (id: string) => {
    if (selectedTags.includes(id)) {
      setValue('tags', selectedTags.filter(t => t !== id), { shouldValidate: true })
    } else {
      setValue('tags', [...selectedTags, id], { shouldValidate: true })
    }
  }

  return (
    <Field.Root invalid={!!errors.tags}>
      <Field.Label>Теги *</Field.Label>
      <HStack flexWrap="wrap">
        {MOCK_TAGS.map(tag => (
          <Badge
            key={tag.id}
            px={3}
            py={1}
            cursor="pointer"
            borderRadius="full"
            colorPalette={selectedTags.includes(tag.id) ? tag.color : 'gray'}
            variant={selectedTags.includes(tag.id) ? 'solid' : 'outline'}
            onClick={() => toggle(tag.id)}
          >
            {tag.label}
          </Badge>
        ))}
      </HStack>
      <Field.ErrorText>{errors.tags?.message}</Field.ErrorText>
    </Field.Root>
  )
}