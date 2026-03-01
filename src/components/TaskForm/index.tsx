import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, VStack, Heading } from '@chakra-ui/react'
import { taskSchema, type TaskFormValues } from './schema'
import { submitTask } from '../../api/mockApi'
import { ContextField } from './fields/ContextField'
import { AssignModeField } from './fields/AssignModeField'
import { AssigneesField } from './fields/AssigneesField'
import { RoutineField } from './fields/RoutineField'
import { DueDateField } from './fields/DueDateField'
import { TopicField } from './fields/TopicField'
import { TagsField } from './fields/TagsField'
import { FilesField } from './fields/FilesField'

export function TaskForm() {
  const methods = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      context: '',
      assignMode: 'members',
      isRoutine: false,
      routinePeriod: '',
      routineDescription: '',
      routineName: '',
      assignees: [],
      dueDate: '',
      dueTime: '',
      topic: '',
      tags: [],
      files: null,
    },
  })

  const onSubmit = async (data: TaskFormValues) => {
    const result = await submitTask(data)
    if (result.success) {
      alert('Задача создана!')
      methods.reset()
    }
  }

  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        maxW="480px"
        mx="auto"
        mt={8}
        p={6}
        borderRadius="xl"
        boxShadow="md"
        bg="white"
      >
        <Heading size="md" mb={6}>Создание задачи</Heading>

        <VStack gap={4} align="stretch">
          <ContextField />
          <AssignModeField />
          <AssigneesField />
          <RoutineField />
          <DueDateField />
          <TopicField />
          <TagsField />
          <FilesField />
        </VStack>

        <Button type="submit" colorScheme="purple" w="full" mt={6}>
          Создать задачу
        </Button>
      </Box>
    </FormProvider>
  )
}