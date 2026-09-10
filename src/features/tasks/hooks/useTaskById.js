import { useQuery } from '@tanstack/react-query'

import { getTask } from '../../../services/api/tasksApi'
import { taskKeys } from '../utils/queryKeys'

function useTaskById(taskId) {
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => getTask(taskId),
    enabled: Boolean(taskId),
  })
}

export default useTaskById