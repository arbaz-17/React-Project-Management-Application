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
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </header>
  )
}

export default Header