import { useState } from "react";

import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

import ConfirmationDialog from "../components/ui/ConfirmationDialog";
import ProjectForm from "../features/projects/components/ProjectForm";
import ProjectList from "../features/projects/components/ProjectList";

import useDisclosure from "../hooks/useDisclosure";

import initialProjects from "../features/projects/data/initialProjects";

function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);

  const {
    isOpen: isCreateModalOpen,
    open: openCreateModal,
    close: closeCreateModal,
  } = useDisclosure();

  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

  function handleCreateProject(values) {
    const now = new Date().toISOString();
    const newProject = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      createdAt: now,
      updatedAt: now,
    };

    setProjects((current) => [...current, newProject]);
    closeCreateModal();
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
    );
    setEditingProject(null);
  }

  function handleDeleteProject(projectId) {
    setProjects((current) =>
      current.filter((project) => project.id !== projectId),
    );
    setDeletingProject(null);
  }

  return (
    <section className="page projects-page">
      <div className="projects-page-header">
        <div>
          <h2>Projects</h2>
          <p>Create and manage your projects.</p>
        </div>

        <Button onClick={openCreateModal}>Create Project</Button>
      </div>

      <ProjectList
        projects={projects}
        onEdit={setEditingProject}
        onDelete={setDeletingProject}
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Create Project"
      >
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={closeCreateModal}
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

      <ConfirmationDialog
        isOpen={Boolean(deletingProject)}
        onClose={() => setDeletingProject(null)}
        onConfirm={() => handleDeleteProject(deletingProject.id)}
        title="Delete Project"
        message={
          deletingProject
            ? `Are you sure you want to delete ${deletingProject.name}?`
            : ""
        }
        confirmLabel="Delete Project"
      />
    </section>
  );
}

export default ProjectsPage;
