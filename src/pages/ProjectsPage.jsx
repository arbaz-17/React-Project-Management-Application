import { useState } from "react";
import { Plus } from "lucide-react";

import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import ConfirmationDialog from "../components/ui/ConfirmationDialog";
import ErrorState from "../components/ui/ErrorState";
import Pagination from "../components/ui/Pagination";
import FetchingIndicator from "../components/ui/FetchingIndicator";

import ProjectForm from "../features/projects/components/ProjectForm";
import ProjectList from "../features/projects/components/ProjectList";
import ProjectFilters from "../features/projects/components/ProjectFilters";

import useDisclosure from "../hooks/useDisclosure";
import useProjectUrlState from "../hooks/useProjectUrlState";
import useProjects from "../features/projects/hooks/useProjects";

import {
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "../features/projects/hooks/useProjectMutations";

function ProjectsPage() {
  const { search, status, category, sort, page, updateUrl, clearUrlState } =
    useProjectUrlState();

  const currentPage = Math.max(Number(page) || 1, 1);

  const {
    data: projectResponse = {
      projects: [],
      hasNextPage: false,
    },
    isLoading,
    isError,
    isFetching,
    error,
    refetch,
  } = useProjects({
    search,
    status,
    category,
    sort,
    page: String(currentPage),
  });

  const projects = projectResponse.projects;
  const hasNextPage = projectResponse.hasNextPage;

  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();

  const {
    isOpen: isCreateModalOpen,
    open: openCreateModal,
    close: closeCreateModal,
  } = useDisclosure();

  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

  const hasActiveFilters =
    Boolean(search) || Boolean(status) || Boolean(category) || Boolean(sort);

  function handleOpenCreateProject() {
    createProjectMutation.reset();
    openCreateModal();
  }

  function handleOpenEditProject(project) {
    updateProjectMutation.reset();
    setEditingProject(project);
  }

  function handleCreateProject(values) {
    createProjectMutation.mutate(values, {
      onSuccess: () => {
        closeCreateModal();
      },
    });
  }

  function handleEditProject(values) {
    if (!editingProject) {
      return;
    }

    updateProjectMutation.mutate(
      {
        projectId: editingProject.id,
        project: values,
      },
      {
        onSuccess: () => {
          setEditingProject(null);
        },
      },
    );
  }

  function handleDeleteProject(projectId) {
    deleteProjectMutation.mutate(projectId, {
      onSuccess: () => {
        setDeletingProject(null);
      },
    });
  }

  function handlePageChange(nextPage) {
    updateUrl({
      page: String(nextPage),
    });
  }

  return (
    <section className="page projects-page">
      <div className="projects-page-header">
        <div className="projects-page-heading">
          <h2>Projects</h2>

          <p>Create, organize, and manage your active project workspaces.</p>
        </div>

        <div className="projects-page-header-actions">
          {isFetching && !isLoading && (
            <FetchingIndicator message="Updating projects..." />
          )}

          <Button
            onClick={handleOpenCreateProject}
            disabled={createProjectMutation.isPending}
          >
            <Plus size={17} aria-hidden="true" />
            Create Project
          </Button>
        </div>
      </div>

      <ProjectFilters
        search={search}
        status={status}
        category={category}
        sort={sort}
        onSearchChange={(value) =>
          updateUrl({
            search: value,
            page: "1",
          })
        }
        onStatusChange={(value) =>
          updateUrl({
            status: value,
            page: "1",
          })
        }
        onCategoryChange={(value) =>
          updateUrl({
            category: value,
            page: "1",
          })
        }
        onSortChange={(value) =>
          updateUrl({
            sort: value,
            page: "1",
          })
        }
        onClear={clearUrlState}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="projects-page-content">
        {isError ? (
          <ErrorState
            title="Unable to load projects"
            message={error.message}
            action={<Button onClick={() => refetch()}>Try Again</Button>}
          />
        ) : (
          <ProjectList
            projects={projects}
            isLoading={isLoading}
            onEdit={handleOpenEditProject}
            onDelete={setDeletingProject}
            hasActiveFilters={hasActiveFilters}
          />
        )}

        {!isLoading && !isError && (
          <Pagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

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
        isConfirming={deleteProjectMutation.isPending}
      />
    </section>
  );
}

export default ProjectsPage;
