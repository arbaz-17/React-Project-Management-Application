import { Sun, Moon } from 'lucide-react'

// Theme is a global state and should be put in redux later it is just a placeholder as of now
function Header({ isDarkMode, toggleTheme }) {
  return (
    <header className="header">
      <div className="header-info">
        <h1>Project Management</h1>
        <p>Manage your projects and tasks</p>
      </div>

      <button
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  )
}

export default Header