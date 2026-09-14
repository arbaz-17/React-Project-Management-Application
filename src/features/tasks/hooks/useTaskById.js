import { useQuery } from '@tanstack/react-query'

import { getTask } from '../../../services/api/tasksApi'

import { taskKeys } from '../utils/queryKeys'

function useTaskById(taskId) {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => getTask(taskId),
    enabled: Boolean(taskId),

    retry: (failureCount, error) => {
      if (error.status === 404) {
        return false
      }

      return failureCount < 2
    },
  })
}

export default useTaskById