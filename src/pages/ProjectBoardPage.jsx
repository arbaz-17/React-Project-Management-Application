import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

import BoardColumn from "../features/board/components/BoardColumn";
import ConfirmationDialog from "../components/ui/ConfirmationDialog";
import TaskForm from "../features/tasks/components/TaskForm";

import useDisclosure from "../hooks/useDisclosure";

import initialTasks from "../features/tasks/data/initialTasks";
import initialProjects from "../features/projects/data/initialProjects";
import { getProjectById } from "../features/projects/utils/projectUtils";

const columns = [
  { id: "BACKLOG", title: "Backlog" },
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

function ProjectBoardPage() {
  const { projectId } = useParams();
  const project = getProjectById(initialProjects, projectId);

  const [tasks, setTasks] = useState(() =>
    initialTasks.filter((task) => task.projectId === projectId),
  );

  const {
    isOpen: isCreateModalOpen,
    open: openCreateModal,
    close: closeCreateModal,
  } = useDisclosure();

  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  function handleCreateTask(values) {
    const now = new Date().toISOString();
    const newTask = {
      id: crypto.randomUUID(),
      projectId,
      ...values,
      createdAt: now,
      updatedAt: now,
    };

    setTasks((current) => [...current, newTask]);
    closeCreateModal();
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
    );
    setEditingTask(null);
  }

  function handleDeleteTask(taskId) {
    setTasks((current) => current.filter((task) => task.id !== taskId));
    setDeletingTask(null);
  }

  function getTasksForColumn(columnId) {
    return tasks.filter((task) => task.status === columnId);
  }

  if (!project) {
    return (
      <section className="page">
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist.</p>
        <br />
        <Link to="/projects" className="button button-primary button-medium">
          Back to Projects
        </Link>
      </section>
    );
  }

  return (
    <section className="page project-board-page">
      <div className="project-board-header">
        <div>
          <Link to="/projects" className="project-back-link">
            ← Back to Projects
          </Link>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>

        <div className="project-board-header-actions">
          <Badge variant="info">Project Board</Badge>
          <Button onClick={openCreateModal}>+ Add Task</Button>
        </div>
      </div>

      <div className="board">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            tasks={getTasksForColumn(column.id)}
            onEditTask={setEditingTask}
            onDeleteTask={setDeletingTask}
          />
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Create Task"
        size="medium"
      >
        <TaskForm onSubmit={handleCreateTask} onCancel={closeCreateModal} />
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
            : ""
        }
        confirmLabel="Delete Task"
      />
    </section>
  );
}

export default ProjectBoardPage;
