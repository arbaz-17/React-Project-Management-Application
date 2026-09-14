import { useState } from "react";
import { ListFilter } from "lucide-react";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

import useDebounce from "../../../hooks/useDebounce.js";

import {
  PROJECT_CATEGORY_OPTIONS,
  PROJECT_STATUS_OPTIONS,
} from "../utils/projectConstants.js";

const SEARCH_DEBOUNCE_DELAY = 400;

const sortOptions = [
  {
    value: "",
    label: "Default",
  },
  {
    value: "name-asc",
    label: "Name (A–Z)",
  },
  {
    value: "name-desc",
    label: "Name (Z–A)",
  },
  {
    value: "created-desc",
    label: "Newest first",
  },
  {
    value: "created-asc",
    label: "Oldest first",
  },
  {
    value: "updated-desc",
    label: "Recently updated",
  },
  {
    value: "updated-asc",
    label: "Least recently updated",
  },
];

function ProjectSearch({ initialValue, onSearchChange }) {
  const [searchInput, setSearchInput] = useState(initialValue);

  const { debouncedCallback: debouncedSearchChange } = useDebounce(
    onSearchChange,
    SEARCH_DEBOUNCE_DELAY,
  );

  function handleSearchChange(event) {
    const value = event.target.value;

    setSearchInput(value);
    debouncedSearchChange(value);
  }

  return (
    <Input
      id="project-search"
      name="search"
      label="Search projects"
      value={searchInput}
      onChange={handleSearchChange}
      placeholder="Search projects..."
    />
  );
}

function ProjectFilters({
  search,
  status,
  category,
  sort,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onSortChange,
  onClear,
  hasActiveFilters,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    {
      value: "",
      label: "All statuses",
    },
    ...PROJECT_STATUS_OPTIONS,
  ];

  const categoryOptions = [
    {
      value: "",
      label: "All categories",
    },
    ...PROJECT_CATEGORY_OPTIONS,
  ];

  const activeFilterCount = [status, category, sort].filter(Boolean).length;

  return (
    <section
      className={`project-filters ${isOpen ? "project-filters-open" : ""}`}
      aria-label="Project filters"
    >
      <div className="project-filters-toolbar">
        <div className="project-filters-search">
          <ProjectSearch
            key={search}
            initialValue={search}
            onSearchChange={onSearchChange}
          />
        </div>

        <div className="project-filters-toolbar-actions">
          <Button
            type="button"
            variant="secondary"
            size="medium"
            onClick={() => setIsOpen((previous) => !previous)}
          >
            <ListFilter size={16} aria-hidden="true" />

            <span>Filters</span>

            {activeFilterCount > 0 && (
              <span
                className="project-filter-count"
                aria-label={`${activeFilterCount} active filters`}
              >
                {activeFilterCount}
              </span>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="secondary"
              size="medium"
              onClick={onClear}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="project-filters-panel">
          <div className="project-filters-panel-grid">
            <div className="project-filter-field">
              <Select
                id="project-status-filter"
                name="status"
                label="Status"
                value={status}
                onChange={(event) => onStatusChange(event.target.value)}
                options={statusOptions}
              />
            </div>

            <div className="project-filter-field">
              <Select
                id="project-category-filter"
                name="category"
                label="Category"
                value={category}
                onChange={(event) => onCategoryChange(event.target.value)}
                options={categoryOptions}
              />
            </div>

            <div className="project-filter-field">
              <Select
                id="project-sort"
                name="sort"
                label="Sort by"
                value={sort}
                onChange={(event) => onSortChange(event.target.value)}
                options={sortOptions}
              />
            </div>
          </div>

          <div className="project-filters-panel-footer">
            <span className="project-filters-panel-hint">
              Refine your project list using status, category, or sorting.
            </span>

            {hasActiveFilters && (
              <Button
                type="button"
                variant="secondary"
                size="small"
                onClick={onClear}
              >
                Clear all filters
              </Button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectFilters;
