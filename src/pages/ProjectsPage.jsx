import { useState } from 'react'

import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import ConfirmationDialog from '../components/ui/ConfirmationDialog'
import LoadingState from '../components/ui/LoadingState'
import ErrorState from '../components/ui/ErrorState'

import ProjectForm from '../features/projects/components/ProjectForm'
import ProjectList from '../features/projects/components/ProjectList'

import useDisclosure from '../hooks/useDisclosure'
import useProjects from '../features/projects/hooks/useProjects'

import {
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from '../features/projects/hooks/useProjectMutations'

function ProjectsPage() {
  const {
    data: projects = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useProjects()

  const createProjectMutation = useCreateProject()
  const updateProjectMutation = useUpdateProject()
  const deleteProjectMutation = useDeleteProject()

  // Local UI state
  const {
    isOpen: isCreateModalOpen,
    open: openCreateModal,
    close: closeCreateModal,
  } = useDisclosure()

  const [editingProject, setEditingProject] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)

  function handleCreateProject(values) {
    createProjectMutation.mutate(values, {
      onSuccess: () => {
        closeCreateModal()
      },
    })
  }

  function handleEditProject(values) {
    if (!editingProject) {
      return
    }

    updateProjectMutation.mutate(
      {
        projectId: editingProject.id,
        project: values,
      },
      {
        onSuccess: () => {
          setEditingProject(null)
        },
      },
    )
  }

  function handleDeleteProject(projectId) {
    deleteProjectMutation.mutate(projectId, {
      onSuccess: () => {
        setDeletingProject(null)
      },
    })
  }

  if (isLoading) {
    return (
      <section className="page projects-page">
        <LoadingState message="Loading projects..." />
      </section>
    )
  }

  if (isError) {
    return (
      <section className="page projects-page">
        <ErrorState
          title="Unable to load projects"
          message={error.message}
          action={
            <Button onClick={() => refetch()}>
              Try Again
            </Button>
          }
        />
      </section>
    )
  }

  return (
    <section className="page projects-page">
      <div className="projects-page-header">
        <div>
          <h2>Projects</h2>
          <p>Create and manage your projects.</p>
        </div>

        <Button
          onClick={openCreateModal}
          disabled={createProjectMutation.isPending}
        >
          Create Project
        </Button>
      </div>

      <ProjectList
        projects={projects}
        onEdit={setEditingProject}
        onDelete={setDeletingProject}
      />

      {/* Create Project */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Create Project"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={closeCreateModal}
          isSubmitting={createProjectMutation.isPending}
          serverError={
            createProjectMutation.isError
              ? createProjectMutation.error.message
              : null
          }
        />
      </Modal>

      {/* Edit Project */}
      <Modal
        isOpen={Boolean(editingProject)}
        onClose={() => setEditingProject(null)}
        title="Edit Project"
      >
        <ProjectForm
          initialValues={editingProject}
          onSubmit={handleEditProject}
          onCancel={() => setEditingProject(null)}
          submitLabel="Save Changes"
          isSubmitting={updateProjectMutation.isPending}
          serverError={
            updateProjectMutation.isError
              ? updateProjectMutation.error.message
              : null
          }
        />
      </Modal>

      {/* Delete Project */}
      <ConfirmationDialog
        isOpen={Boolean(deletingProject)}
        onClose={() => setDeletingProject(null)}
        onConfirm={() => handleDeleteProject(deletingProject.id)}
        title="Delete Project"
        message={
          deletingProject
            ? `Are you sure you want to delete ${deletingProject.name}?`
            : ''
        }
        confirmLabel="Delete Project"
        isConfirming={deleteProjectMutation.isPending}
      />
    </section>
  )
}

export default ProjectsPage