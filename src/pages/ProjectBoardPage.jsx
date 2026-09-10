import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import ConfirmationDialog from '../components/ui/ConfirmationDialog'
import LoadingState from '../components/ui/LoadingState'
import ErrorState from '../components/ui/ErrorState'

import Board from '../features/board/components/Board'
import BoardHeader from '../features/board/components/BoardHeader'
import TaskForm from '../features/tasks/components/TaskForm'

import useDisclosure from '../hooks/useDisclosure'
import useProjectById from '../features/projects/hooks/useProjectById'

import initialTasks from '../features/tasks/data/initialTasks'

function ProjectBoardPage() {
  const { projectId } = useParams()

  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
    refetch: refetchProject,
  } = useProjectById(projectId)

  const [tasks, setTasks] = useState(() =>
    initialTasks.filter((task) => task.projectId === projectId),
  )

  const {
    isOpen: isCreateModalOpen,
    open: openCreateModal,
    close: closeCreateModal,
  } = useDisclosure()

  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)

  function handleCreateTask(values) {
    const now = new Date().toISOString()

    const newTask = {
      id: crypto.randomUUID(),
      projectId,
      ...values,
      createdAt: now,
      updatedAt: now,
    }

    setTasks((current) => [...current, newTask])
    closeCreateModal()
  }

  function handleEditTask(values) {
    setTasks((current) =>
      current.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              ...values,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    )

    setEditingTask(null)
  }

  function handleDeleteTask(taskId) {
    setTasks((current) => current.filter((task) => task.id !== taskId))

    setDeletingTask(null)
  }

  if (isProjectLoading) {
    return (
      <section className="page project-board-page">
        <LoadingState message="Loading project..." />
      </section>
    )
  }

  if (isProjectError) {
    return (
      <section className="page project-board-page">
        <ErrorState
          title="Unable to load project"
          message={projectError.message}
          action={
            <Button onClick={() => refetchProject()}>
              Try Again
            </Button>
          }
        />
      </section>
    )
  }

  if (!project) {
    return (
      <section className="page">
        <h2>Project Not Found</h2>

        <p>The project you're looking for doesn't exist.</p>

        <br />

        <Link
          to="/projects"
          className="button button-primary button-medium"
        >
          Back to Projects
        </Link>
      </section>
    )
  }

  return (
    <section className="page project-board-page">
      <BoardHeader
        project={project}
        onAddTask={openCreateModal}
      />

      <Board
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={setDeletingTask}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Create Task"
        size="medium"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={closeCreateModal}
        />
      </Modal>

      <Modal
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
        size="medium"
      >
        {editingTask && (
          <TaskForm
            key={editingTask.id}
            initialValues={editingTask}
            onSubmit={handleEditTask}
            onCancel={() => setEditingTask(null)}
            submitLabel="Save Changes"
          />
        )}
      </Modal>

      <ConfirmationDialog
        isOpen={Boolean(deletingTask)}
        onClose={() => setDeletingTask(null)}
        onConfirm={() => handleDeleteTask(deletingTask.id)}
        title="Delete Task"
        message={
          deletingTask
            ? `Are you sure you want to delete ${deletingTask.title}?`
            : ''
        }
        confirmLabel="Delete Task"
      />
    </section>
  )
}

export default ProjectBoardPage