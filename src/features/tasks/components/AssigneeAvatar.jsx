import Avatar from '../../../components/ui/Avatar'

function AssigneeAvatar({
  assignee,
  className = '',
}) {
  return (
    <div className={`task-assignee ${className}`.trim()}>
      <Avatar name={assignee} size="small" />
      <span>{assignee}</span>
    </div>
  )
}

export default AssigneeAvatar