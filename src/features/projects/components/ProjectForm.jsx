import { useState } from "react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Textarea from "../../../components/ui/Textarea";

import {
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_OPTIONS,
  PROJECT_STATUSES,
  PROJECT_STATUS_OPTIONS,
  normalizeProjectCategory,
} from "../utils/projectConstants.js";

import { validateProject } from "../utils/projectValidation";

function getInitialStatus(initialStatus) {
  if (!initialStatus) {
    return PROJECT_STATUSES.ACTIVE;
  }

  const normalizedStatus = String(initialStatus).toLowerCase();

  const matchingStatus = Object.values(PROJECT_STATUSES).find(
    (status) => status.toLowerCase() === normalizedStatus,
  );

  return matchingStatus ?? "";
}

function getInitialCategory(initialCategory) {
  if (!initialCategory) {
    return PROJECT_CATEGORIES.WEB_DEVELOPMENT;
  }

  return normalizeProjectCategory(initialCategory);
}

function ProjectForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Create Project",
  isSubmitting = false,
  serverError = null,
}) {
  const [values, setValues] = useState({
    name: initialValues?.name ?? "",
    description: initialValues?.description ?? "",
    category: getInitialCategory(initialValues?.category),
    status: getInitialStatus(initialValues?.status),
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

    const validationErrors = validateProject(values);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit({
      name: values.name.trim(),
      description: values.description.trim(),
      category: values.category,
      status: values.status,
    });
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      {serverError && (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      )}

      <Input
        id="project-name"
        label="Project Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="e.g. Website Redesign"
        required
        disabled={isSubmitting}
        error={errors.name}
      />

      <Textarea
        id="project-description"
        label="Description"
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Describe the project..."
        rows={5}
        disabled={isSubmitting}
        error={errors.description}
      />

      <Select
        id="project-category"
        name="category"
        label="Category"
        value={values.category}
        onChange={handleChange}
        options={[
          {
            value: "",
            label: "Select category",
          },
          ...PROJECT_CATEGORY_OPTIONS,
        ]}
        required
        disabled={isSubmitting}
        error={errors.category}
      />

      <Select
        id="project-status"
        name="status"
        label="Status"
        value={values.status}
        onChange={handleChange}
        options={[
          {
            value: "",
            label: "Select status",
          },
          ...PROJECT_STATUS_OPTIONS,
        ]}
        required
        disabled={isSubmitting}
        error={errors.status}
      />

      <div className="project-form-actions">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default ProjectForm;
