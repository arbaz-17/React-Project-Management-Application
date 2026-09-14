import { ChevronLeft, ChevronRight, FolderKanban, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  {
    label: 'Projects',
    to: '/projects',
    icon: FolderKanban,
  },
]

function Sidebar({
  isCollapsed,
  isMobileOpen,
  onToggleCollapsed,
  onCloseMobile,
}) {
  return (
    <aside
      id="app-sidebar"
      className={[
        'sidebar',
        isCollapsed ? 'sidebar-collapsed' : '',
        isMobileOpen ? 'sidebar-mobile-open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="sidebar-logo" aria-hidden="true">
            <FolderKanban size={16} />
          </span>

          <h2 className="sidebar-brand-name">PMS-Optimus Fox</h2>
        </div>

        <button
          type="button"
          className="sidebar-mobile-close"
          onClick={onCloseMobile}
          aria-label="Close navigation menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        <span className="sidebar-nav-label">Menu</span>

        {navigationItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
              }
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={18} aria-hidden="true" />

              <span className="sidebar-link-label">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={onToggleCollapsed}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? (
            <ChevronRight size={18} />
          ) : (
            <>
              <ChevronLeft size={18} />
              <span>Collapse sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar