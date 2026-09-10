import { useQuery } from '@tanstack/react-query'

import { getProjects } from '../../../services/api/projectsApi'
import { projectKeys } from '../utils/queryKeys'

function useProjects() {
  return useQuery({
    queryKey: projectKeys.list(),
    queryFn: getProjects,
  })
}

export default useProjects