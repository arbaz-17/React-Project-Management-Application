import { useQuery } from '@tanstack/react-query'

import { getTasksByProject } from '../../../services/api/tasksApi'
import { taskKeys } from '../utils/queryKeys'

function useProjectTasks(projectId) {
  return useQuery({
    queryKey: taskKeys.list({ projectId }),
    queryFn: () => getTasksByProject(projectId),
    enabled: Boolean(projectId),
  })
}

export default useProjectTasks