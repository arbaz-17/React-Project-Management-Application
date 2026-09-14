import { useQuery } from '@tanstack/react-query'

import { getProjects } from '../../../services/api/projectsApi'
import { projectKeys } from '../utils/queryKeys'

function useProjects(filters = {}) {
  return useQuery({
    queryKey: projectKeys.list(filters),

    queryFn: ({ signal }) =>
      getProjects(filters, { signal }),
  })
}

export default useProjects