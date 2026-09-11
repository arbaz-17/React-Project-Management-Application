import EmptyState from '../../../components/ui/EmptyState'
import ProjectCard from './ProjectCard'

function ProjectList({
  projects,
  onEdit,
  onDelete,
  hasActiveFilters = false,
}) {
  if (projects.length === 0) {
    return (
      <EmptyState
        title={
          hasActiveFilters
            ? 'No matching projects'
            : 'No projects yet'
        }
        message={
          hasActiveFilters
            ? 'Try adjusting or clearing your filters.'
            : 'Create your first project to get started.'
        }
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