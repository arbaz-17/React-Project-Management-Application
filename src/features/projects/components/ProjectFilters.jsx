import { useState } from "react";

import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "ACTIVE", label: "Active" },
  { value: "COMPLETED", label: "Completed" },
  { value: "ARCHIVED", label: "Archived" },
];

const sortOptions = [
  { value: "", label: "Default" },
  { value: "name-asc", label: "Name (A–Z)" },
  { value: "name-desc", label: "Name (Z–A)" },
  { value: "created-desc", label: "Newest first" },
  { value: "created-asc", label: "Oldest first" },
  { value: "updated-desc", label: "Recently updated" },
  { value: "updated-asc", label: "Least recently updated" },
];

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

  return (
    <section
      className={`project-filters ${isOpen ? "project-filters-open" : ""}`}
      aria-label="Project filters"
    >
      {/* Main toolbar */}
      <div className="project-filters-toolbar">
        <div className="project-filters-search">
          <Input
            id="project-search"
            name="search"
            label="Search projects"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search projects..."
          />
        </div>

        <div className="project-filters-toolbar-actions">
          <Button
            type="button"
            variant="secondary"
            size="medium"
            onClick={() => setIsOpen((previous) => !previous)}
          >
            <span className="project-filter-button-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 6h16" />
                <path d="M7 12h10" />
                <path d="M10 18h4" />
              </svg>
            </span>

            <span>Filters</span>

            {(() => {
              const activeFilterCount = [status, category, sort].filter(
                Boolean,
              ).length;

              return activeFilterCount > 0 ? (
                <span
                  className="project-filter-count"
                  aria-label={`${activeFilterCount} active filters`}
                >
                  {activeFilterCount}
                </span>
              ) : null;
            })()}
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

      {/* Expandable filter panel */}
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
              <Input
                id="project-category-filter"
                name="category"
                label="Category"
                value={category}
                onChange={(event) => onCategoryChange(event.target.value)}
                placeholder="e.g. Web Development"
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
