import { Sun, Moon } from 'lucide-react'

import { useTheme } from '../../hooks/useTheme.js'

function Header() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <header className="header">
      <div className="header-info">
        <h1>React Project Management System - Optimus Fox</h1>
        <p>Month 2 Project</p>
      </div>

      <button
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