import { LayoutDashboard, FolderKanban } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  {
    label: 'Dashboard',
    to: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Projects',
    to: '/projects',
    icon: FolderKanban,
  },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo" aria-hidden="true">
          <FolderKanban size={16} />
        </span>
        <h2>Mini Jira</h2>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <span className="sidebar-nav-label">Menu</span>

        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar