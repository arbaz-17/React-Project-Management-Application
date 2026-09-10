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
import useProjectTasks from '../features/tasks/hooks/useProjectTasks'

import {
  useCreateTask,
  useUpdateTask,
  useDeleteTask,
} from '../features/tasks/hooks/useTaskMutations'

function ProjectBoardPage() {
  const { projectId } = useParams()

  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
    refetch: refetchProject,
  } = useProjectById(projectId)

  const {
    data: tasks = [],
    isLoading: isTasksLoading,
    isError: isTasksError,
    error: tasksError,
    refetch: refetchTasks,
  } = useProjectTasks(projectId)

  const createTaskMutation = useCreateTask()
  const updateTaskMutation = useUpdateTask()
  const deleteTaskMutation = useDeleteTask()

  const {
    isOpen: isCreateModalOpen,
    open: openCreateModal,
    close: closeCreateModal,
  } = useDisclosure()

  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)

  function handleCreateTask(values) {
    createTaskMutation.mutate(
      {
        projectId,
        task: values,
      },
      {
        onSuccess: () => {
          closeCreateModal()
        },
      },
    )
  }

function handleEditTask(values) {
  if (!editingTask) {
    return
  }

  updateTaskMutation.mutate(
    {
      taskId: editingTask.id,
      task: {
        projectId,
        ...values,
      },
    },
    {
      onSuccess: () => {
        setEditingTask(null)
      },
    },
  )
}

function handleDeleteTask(taskId) {
  deleteTaskMutation.mutate(
    {
      projectId,
      taskId,
    },
    {
      onSuccess: () => {
        setDeletingTask(null)
      },
    },
  )
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

  if (isTasksLoading) {
    return (
      <section className="page project-board-page">
        <BoardHeader
          project={project}
          onAddTask={openCreateModal}
        />

        <LoadingState message="Loading tasks..." />
      </section>
    )
  }

  if (isTasksError) {
    return (
      <section className="page project-board-page">
        <BoardHeader
          project={project}
          onAddTask={openCreateModal}
        />

        <ErrorState
          title="Unable to load tasks"
          message={tasksError.message}
          action={
            <Button onClick={() => refetchTasks()}>
              Try Again
            </Button>
          }
        />
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
        onEditTask={setEditingTask}
        onDeleteTask={setDeletingTask}
      />

      {/* Create Task */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Create Task"
        size="medium"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={closeCreateModal}
          isSubmitting={createTaskMutation.isPending}
          serverError={
            createTaskMutation.isError
              ? createTaskMutation.error.message
              : null
          }
        />
      </Modal>

      {/* Edit Task */}
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
            isSubmitting={updateTaskMutation.isPending}
            serverError={
              updateTaskMutation.isError
                ? updateTaskMutation.error.message
                : null
            }
          />
        )}
      </Modal>

      {/* Delete Task */}
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
        isConfirming={deleteTaskMutation.isPending}
      />
    </section>
  )
}

export default ProjectBoardPage