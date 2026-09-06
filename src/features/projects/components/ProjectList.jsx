import EmptyState from '../../../components/ui/EmptyState'

import ProjectCard from './ProjectCard'

function ProjectList({
  projects,
  onEdit,
  onDelete,
}) {
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects yet"
        message="Create your first project to get started."
      />
    )
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default ProjectList