import Card from '../../../components/ui/Card'
import TaskCardSkeleton from '../../tasks/components/TaskCardSkeleton'

import { boardColumns } from './boardColumns.js'

const SKELETON_CARDS_PER_COLUMN = 2

function BoardSkeleton() {
  return (
    <div
      className="board"
      role="status"
      aria-live="polite"
      aria-label="Loading tasks"
    >
      {boardColumns.map((column) => (
        <Card key={column.id} className="board-column">
          <div className="board-column-header">
            <h3>{column.title}</h3>
            <span className="skeleton board-column-count-skeleton" />
          </div>

          <div className="board-column-content">
            {Array.from({ length: SKELETON_CARDS_PER_COLUMN }).map((_, index) => (
              <TaskCardSkeleton key={index} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

export default BoardSkeleton