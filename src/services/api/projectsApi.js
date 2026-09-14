import request from "./apiClient";

export const PROJECTS_PER_PAGE = 6;

function buildProjectParams(filters = {}, page) {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.category) {
    params.set("category", filters.category);
  }

  params.set("page", String(page));
  params.set("limit", String(PROJECTS_PER_PAGE));

  if (filters.sort) {
    const [sortBy, order] = filters.sort.split("-");

    params.set("sortBy", sortBy);
    params.set("order", order);
  }

  return params;
}

async function getProjectsPage(filters, page, options = {}) {
  const params = buildProjectParams(filters, page);

  try {
    return await request(`/projects?${params.toString()}`, {
      signal: options.signal,
    });
  } catch (error) {
    if (error.status === 404) {
      return [];
    }

    throw error;
  }
}

export async function getProjects(filters = {}, options = {}) {
  const currentPage = Math.max(Number(filters.page) || 1, 1);

  const projects = await getProjectsPage(filters, currentPage, options);

  if (projects.length < PROJECTS_PER_PAGE) {
    return {
      projects,
      hasNextPage: false,
    };
  }

  const nextPageProjects = await getProjectsPage(
    filters,
    currentPage + 1,
    options,
  );

  return {
    projects,
    hasNextPage: nextPageProjects.length > 0,
  };
}

export function getProject(projectId) {
  return request(`/projects/${projectId}`);
}

export function createProject(project) {
  const now = new Date().toISOString();

  return request("/projects", {
    method: "POST",
    body: JSON.stringify({
      ...project,
      createdAt: now,
      updatedAt: now,
    }),
  });
}

export function updateProject(projectId, project) {
  return request(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify({
      ...project,
      updatedAt: new Date().toISOString(),
    }),
  });
}

export function deleteProject(projectId) {
  return request(`/projects/${projectId}`, {
    method: "DELETE",
  });
}
