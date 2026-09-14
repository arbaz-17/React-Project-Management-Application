import {
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
} from 'lucide-react'

import { useTheme } from '../../hooks/useTheme.js'

function Header({
  isSidebarCollapsed,
  isMobileSidebarOpen,
  onToggleSidebar,
  onOpenMobileSidebar,
}) {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header-left">
        <button
          type="button"
          className="header-sidebar-btn header-sidebar-btn-desktop"
          onClick={onToggleSidebar}
          aria-label={
            isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
          }
          aria-expanded={!isSidebarCollapsed}
          aria-controls="app-sidebar"
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen size={19} />
          ) : (
            <PanelLeftClose size={19} />
          )}
        </button>

        <button
          type="button"
          className="header-sidebar-btn header-sidebar-btn-mobile"
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation menu"
          aria-expanded={isMobileSidebarOpen}
          aria-controls="app-sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="header-info">
          <h1>React Project Management System - Optimus Fox</h1>
          <p>Month 2 Project</p>
        </div>
      </div>

      <button
        type="button"
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label={
          isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
        }
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  )
}

export default Header