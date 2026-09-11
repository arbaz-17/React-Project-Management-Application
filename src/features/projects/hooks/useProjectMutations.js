import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

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

      toast.success('Project created successfully')
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to create project')
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

      toast.success('Project updated successfully')
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to update project')
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

      toast.success('Project deleted successfully')
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to delete project')
    },
  })
}

export {
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
}