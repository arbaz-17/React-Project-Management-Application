import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from './Button'

function Pagination({
  currentPage,
  hasNextPage,
  onPageChange,
}) {
  const hasPreviousPage = currentPage > 1

  if (!hasPreviousPage && !hasNextPage) {
    return null
  }

  return (
    <nav
      className="pagination"
      aria-label="Project pagination"
    >
      <div className="pagination-info">
        <span>Page</span>

        <strong aria-live="polite">
          {currentPage}
        </strong>
      </div>

      <div className="pagination-controls">
        <Button
          type="button"
          variant="secondary"
          size="small"
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Go to previous page"
        >
          <ChevronLeft size={16} />
          <span className="pagination-button-text">
            Previous
          </span>
        </Button>

        <div
          className="pagination-page-indicator"
          aria-current="page"
        >
          {currentPage}
        </div>

        <Button
          type="button"
          variant="secondary"
          size="small"
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Go to next page"
        >
          <span className="pagination-button-text">
            Next
          </span>
          <ChevronRight size={16} />
        </Button>
      </div>
    </nav>
  )
}

export default Pagination