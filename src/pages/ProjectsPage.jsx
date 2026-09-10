import { useState } from 'react'

import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

import DeleteProjectModal from '../features/projects/components/DeleteProjectModal'
import ProjectForm from '../features/projects/components/ProjectForm'
import ProjectList from '../features/projects/components/ProjectList'

import initialProjects from '../features/projects/data/initialProjects'

function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)

  function handleCreateProject(values) {
    const now = new Date().toISOString()
    const newProject = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      createdAt: now,
      updatedAt: now,
    }

    setProjects((current) => [...current, newProject])
    setIsCreateModalOpen(false)
  }

  function handleEditProject(values) {
    setProjects((current) =>
      current.map((project) =>
        project.id === editingProject.id
          ? {
              ...project,
              name: values.name,
              description: values.description,
              updatedAt: new Date().toISOString(),
            }
          : project,
      ),
    )
    setEditingProject(null)
  }

  function handleDeleteProject(projectId) {
    setProjects((current) => current.filter((project) => project.id !== projectId))
    setDeletingProject(null)
  }

  return (
    <section className="page projects-page">
      <div className="projects-page-header">
        <div>
          <h2>Projects</h2>
          <p>Create and manage your projects.</p>
        </div>

        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Project
        </Button>
      </div>

      <ProjectList
        projects={projects}
        onEdit={setEditingProject}
        onDelete={setDeletingProject}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Project"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

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
        />
      </Modal>

      <DeleteProjectModal
        project={deletingProject}
        isOpen={Boolean(deletingProject)}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDeleteProject}
      />
    </section>
  )
}

export default ProjectsPage