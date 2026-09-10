import { useQuery } from '@tanstack/react-query'

import { getProject } from '../../../services/api/projectsApi'
import { projectKeys } from '../utils/queryKeys'

function useProjectById(projectId) {
  return useQuery({
    queryKey: projectKeys.detail(projectId),
    queryFn: () => getProject(projectId),
    enabled: Boolean(projectId),
  })
}

export default useProjectById