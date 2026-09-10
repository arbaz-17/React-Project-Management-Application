export const projectKeys = {
  all: ['projects'],
  lists: () => [...projectKeys.all, 'list'],
  list: () => [...projectKeys.lists()],
  details: () => [...projectKeys.all, 'detail'],
  detail: (projectId) => [...projectKeys.details(), projectId],
}