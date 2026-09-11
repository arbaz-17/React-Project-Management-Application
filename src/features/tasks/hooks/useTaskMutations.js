import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  createTask,
  updateTask,
  deleteTask,
} from '../../../services/api/tasksApi'

import { taskKeys } from '../utils/queryKeys'

function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, task }) =>
      createTask({
        projectId,
        ...task,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.list({
          projectId: variables.projectId,
        }),
      })

      toast.success('Task created successfully')
    },

    onError: (error) => {
      toast.error(
        error.message || 'Failed to create task',
      )
    },
  })
}

function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, task }) =>
      updateTask(taskId, task),

    async onMutate(variables) {
      const {
        taskId,
        task,
        projectId,
      } = variables

      await queryClient.cancelQueries({
        queryKey: taskKeys.lists(),
      })

      const previousTaskQueries =
        queryClient.getQueriesData({
          queryKey: taskKeys.lists(),
        })

      const previousTask =
        queryClient.getQueryData(
          taskKeys.detail(taskId),
        )

      queryClient.setQueriesData(
        {
          queryKey: taskKeys.lists(),
        },
        (currentTasks) => {
          if (!Array.isArray(currentTasks)) {
            return currentTasks
          }

          return currentTasks.map((currentTask) =>
            currentTask.id === taskId
              ? {
                  ...currentTask,
                  ...task,
                  updatedAt: new Date().toISOString(),
                }
              : currentTask,
          )
        },
      )

      queryClient.setQueryData(
        taskKeys.detail(taskId),
        (currentTask) => {
          if (!currentTask) {
            return currentTask
          }

          return {
            ...currentTask,
            ...task,
            updatedAt: new Date().toISOString(),
          }
        },
      )

      return {
        previousTaskQueries,
        previousTask,
      }
    },

    onError: (error, variables, context) => {
      if (context) {
        context.previousTaskQueries.forEach(
          ([queryKey, previousTasks]) => {
            queryClient.setQueryData(
              queryKey,
              previousTasks,
            )
          },
        )

        queryClient.setQueryData(
          taskKeys.detail(variables.taskId),
          context.previousTask,
        )
      }

      toast.error(
        error.message || 'Failed to update task',
      )
    },

    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        taskKeys.detail(updatedTask.id),
        updatedTask,
      )

      toast.success('Task updated successfully')
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.list({
          projectId: variables.projectId,
        }),
      })

      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.taskId),
      })
    },
  })
}


function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, projectId }) =>
      deleteTask(taskId),

    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: taskKeys.detail(variables.taskId),
      })

      queryClient.invalidateQueries({
        queryKey: taskKeys.list({
          projectId: variables.projectId,
        }),
      })

      toast.success('Task deleted successfully')
    },

    onError: (error) => {
      toast.error(
        error.message || 'Failed to delete task',
      )
    },
  })
}

export {
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
}