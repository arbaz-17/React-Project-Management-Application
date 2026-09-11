import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'

const statusOptions = [
  { value: '', label: 'All statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'ARCHIVED', label: 'Archived' },
]

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'name-asc', label: 'Name (A–Z)' },
  { value: 'name-desc', label: 'Name (Z–A)' },
  { value: 'created-desc', label: 'Newest first' },
  { value: 'created-asc', label: 'Oldest first' },
  { value: 'updated-desc', label: 'Recently updated' },
  { value: 'updated-asc', label: 'Least recently updated' },
]

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
  return (
    <section
      className="project-filters"
      aria-label="Project filters"
    >
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

      <div className="project-filters-grid">
        <Select
          id="project-status-filter"
          name="status"
          label="Status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          options={statusOptions}
        />

        <Input
          id="project-category-filter"
          name="category"
          label="Category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          placeholder="e.g. Web Development"
        />

        <Select
          id="project-sort"
          name="sort"
          label="Sort by"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          options={sortOptions}
        />
      </div>

      {hasActiveFilters && (
        <div className="project-filters-actions">
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={onClear}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </section>
  )
}

export default ProjectFilters