import { useMutation, useQueryClient } from '@tanstack/react-query'

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
    },
  })
}

function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ taskId, task }) =>
      updateTask(taskId, task),

    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        taskKeys.detail(updatedTask.id),
        updatedTask,
      )

      queryClient.invalidateQueries({
        queryKey: taskKeys.list({
          projectId: updatedTask.projectId,
        }),
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
    },
  })
}

export {
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
}