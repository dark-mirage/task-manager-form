import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, VStack, Text, HStack } from '@chakra-ui/react'
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
  const [activeTab, setActiveTab] = useState<'task' | 'reminder'>('task')

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
        w="100%"
        maxW="480px"
        bg="white"
        borderRadius="2xl"
        boxShadow="xl"
        overflow="hidden"
      >
        <HStack px={5} py={4} justify="space-between">
          <HStack gap={2}>
            <Text color="#7C3AED" fontSize="lg">☑</Text>
            <Text fontWeight="700" fontSize="md" color="gray.800">Создание задачи</Text>
          </HStack>
          <Box
            w="32px"
            h="32px"
            borderRadius="full"
            border="2px solid"
            borderColor="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            color="gray.400"
            fontSize="sm"
            fontWeight="bold"
            _hover={{ borderColor: 'gray.400', color: 'gray.600' }}
          >
            ✕
          </Box>
        </HStack>

        <Box px={4} pb={4}>
          <HStack
            bg="gray.100"
            borderRadius="full"
            p="3px"
            gap={0}
          >
            <Button
              flex={1}
              size="sm"
              borderRadius="full"
              fontSize="xs"
              fontWeight="600"
              bg={activeTab === 'task' ? '#7C3AED' : 'transparent'}
              color={activeTab === 'task' ? 'white' : 'gray.500'}
              _hover={{ bg: activeTab === 'task' ? '#6D28D9' : 'transparent' }}
              onClick={() => setActiveTab('task')}
              h="34px"
            >
              Создание задачи
            </Button>
            <Button
              flex={1}
              size="sm"
              borderRadius="full"
              fontSize="xs"
              fontWeight="600"
              bg={activeTab === 'reminder' ? '#7C3AED' : 'transparent'}
              color={activeTab === 'reminder' ? 'white' : 'gray.500'}
              _hover={{ bg: activeTab === 'reminder' ? '#6D28D9' : 'transparent' }}
              onClick={() => setActiveTab('reminder')}
              h="34px"
            >
              Создание напоминания
            </Button>
          </HStack>
        </Box>

        <VStack gap={4} align="stretch" px={5} pb={5}>
          <ContextField />

          <HStack justify="space-between">
            <AssignModeField />
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                style={{ accentColor: '#7C3AED', width: '16px', height: '16px' }}
                {...methods.register('isRoutine')}
              />
              <Text fontSize="xs" color="gray.500">Рутинная задача</Text>
            </label>
          </HStack>
          <RoutineField />
          <AssigneesField />
          <DueDateField />
          <TopicField />
          <TagsField />
          <FilesField />
        </VStack>

        <Box px={5} pb={5}>
          <Button
            type="submit"
            w="full"
            bg="#7C3AED"
            color="white"
            borderRadius="full"
            fontWeight="600"
            fontSize="sm"
            py={5}
            _hover={{ bg: '#6D28D9' }}
            _active={{ bg: '#5B21B6' }}
          >
            Создать задачу
          </Button>
        </Box>
      </Box>
    </FormProvider>
  )
}