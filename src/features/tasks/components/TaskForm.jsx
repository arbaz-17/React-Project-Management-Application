import { useState } from "react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";

import {
  TASK_PRIORITIES,
  TASK_PRIORITY_OPTIONS,
  TASK_STATUSES,
  TASK_STATUS_OPTIONS,
  normalizeTaskPriority,
  normalizeTaskStatus,
} from "../utils/taskConstants.js";

import { validateTask } from "../utils/taskValidation";

function TaskForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Create Task",
  isSubmitting = false,
  serverError = null,
}) {
  const [values, setValues] = useState({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    status: normalizeTaskStatus(initialValues?.status) || TASK_STATUSES.TODO,
    priority:
      normalizeTaskPriority(initialValues?.priority) || TASK_PRIORITIES.MEDIUM,
    assignee: initialValues?.assignee ?? "",
    dueDate: initialValues?.dueDate ?? "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateTask(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
      priority: values.priority,
      assignee: values.assignee.trim(),
      dueDate: values.dueDate || null,
    });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {serverError && (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      )}

      <Input
        id="task-title"
        name="title"
        label="Task Title"
        value={values.title}
        onChange={handleChange}
        placeholder="e.g. Implement login page"
        required
        disabled={isSubmitting}
        error={errors.title}
      />

      <Textarea
        id="task-description"
        name="description"
        label="Description"
        value={values.description}
        onChange={handleChange}
        placeholder="Describe the task..."
        rows={5}
        disabled={isSubmitting}
        error={errors.description}
      />

      <div className="task-form-grid">
        <Select
          id="task-status"
          name="status"
          label="Status"
          value={values.status}
          onChange={handleChange}
          options={TASK_STATUS_OPTIONS}
          required
          disabled={isSubmitting}
          error={errors.status}
        />

        <Select
          id="task-priority"
          name="priority"
          label="Priority"
          value={values.priority}
          onChange={handleChange}
          options={TASK_PRIORITY_OPTIONS}
          required
          disabled={isSubmitting}
          error={errors.priority}
        />
      </div>

      <div className="task-form-grid">
        <Input
          id="task-assignee"
          name="assignee"
          label="Assignee"
          value={values.assignee}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          required
          disabled={isSubmitting}
          error={errors.assignee}
        />

        <Input
          id="task-due-date"
          name="dueDate"
          type="date"
          label="Due Date"
          value={values.dueDate}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>

        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;
