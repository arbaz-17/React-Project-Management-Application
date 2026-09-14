import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createTask,
  updateTask,
  deleteTask,
} from "../../../services/api/tasksApi";

import { taskKeys } from "../utils/queryKeys";

function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, task }) =>
      createTask({
        projectId,
        ...task,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.list({
          projectId: variables.projectId,
        }),
      });

      toast.success("Task created successfully");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create task");
    },
  });
}

function useUpdateTask(options = {}) {
  const {
    showSuccessToast = true,
    successMessage = "Task updated successfully",
  } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, projectId, task }) =>
      updateTask(taskId, {
        projectId,
        ...task,
      }),

    async onMutate(variables) {
      const { taskId, task, projectId } = variables;

      const projectTasksKey = taskKeys.list({
        projectId,
      });

      const taskDetailKey = taskKeys.detail(taskId);

      await Promise.all([
        queryClient.cancelQueries({
          queryKey: projectTasksKey,
        }),

        queryClient.cancelQueries({
          queryKey: taskDetailKey,
        }),
      ]);

      const previousTasks = queryClient.getQueryData(projectTasksKey);

      const previousTask = queryClient.getQueryData(taskDetailKey);

      const optimisticUpdatedAt = new Date().toISOString();

      queryClient.setQueryData(projectTasksKey, (currentTasks) => {
        if (!Array.isArray(currentTasks)) {
          return currentTasks;
        }

        return currentTasks.map((currentTask) =>
          currentTask.id === taskId
            ? {
                ...currentTask,
                ...task,
                projectId,
                updatedAt: optimisticUpdatedAt,
              }
            : currentTask,
        );
      });

      queryClient.setQueryData(taskDetailKey, (currentTask) => {
        if (!currentTask) {
          return currentTask;
        }

        return {
          ...currentTask,
          ...task,
          projectId,
          updatedAt: optimisticUpdatedAt,
        };
      });

      return {
        previousTasks,
        previousTask,
        projectTasksKey,
        taskDetailKey,
      };
    },

    onError: (error, _variables, context) => {
      if (context) {
        if (context.previousTasks !== undefined) {
          queryClient.setQueryData(
            context.projectTasksKey,
            context.previousTasks,
          );
        }

        if (context.previousTask !== undefined) {
          queryClient.setQueryData(context.taskDetailKey, context.previousTask);
        }
      }

      toast.error(error.message || "Failed to update task");
    },

    onSuccess: (updatedTask, variables) => {
      const projectTasksKey = taskKeys.list({
        projectId: variables.projectId,
      });

      queryClient.setQueryData(projectTasksKey, (currentTasks) => {
        if (!Array.isArray(currentTasks)) {
          return currentTasks;
        }

        return currentTasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask,
        );
      });

      queryClient.setQueryData(taskKeys.detail(updatedTask.id), updatedTask);

      if (showSuccessToast) {
        toast.success(successMessage);
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.list({
          projectId: variables.projectId,
        }),
      });

      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.taskId),
      });
    },
  });
}

function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, projectId }) => deleteTask(taskId),

    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: taskKeys.detail(variables.taskId),
      });

      queryClient.invalidateQueries({
        queryKey: taskKeys.list({
          projectId: variables.projectId,
        }),
      });

      toast.success("Task deleted successfully");
    },

    onError: (error) => {
      toast.error(error.message || "Failed to delete task");
    },
  });
}

export { useCreateTask, useUpdateTask, useDeleteTask };
