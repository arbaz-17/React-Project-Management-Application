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
      <Button
        variant="secondary"
        size="small"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <span
        className="pagination-page"
        aria-live="polite"
      >
        Page {currentPage}
      </span>

      <Button
        variant="secondary"
        size="small"
        disabled={!hasNextPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </nav>
  )
}

export default Pagination