import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  createProject,
  updateProject,
  deleteProject,
} from '../../../services/api/projectsApi'

import { projectKeys } from '../utils/queryKeys'

function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.list(),
      })
    },
  })
}

function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, project }) =>
      updateProject(projectId, project),

    onSuccess: (updatedProject) => {
      queryClient.setQueryData(
        projectKeys.detail(updatedProject.id),
        updatedProject,
      )

      queryClient.invalidateQueries({
        queryKey: projectKeys.list(),
      })
    },
  })
}

function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProject,

    onSuccess: (_, projectId) => {
      queryClient.removeQueries({
        queryKey: projectKeys.detail(projectId),
      })

      queryClient.invalidateQueries({
        queryKey: projectKeys.list(),
      })
    },
  })
}

export {
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
}