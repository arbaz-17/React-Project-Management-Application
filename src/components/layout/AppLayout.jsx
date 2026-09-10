import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header'
import PageContainer from './PageContainer'
import Sidebar from './Sidebar'

function AppLayout() {
  // Initialize theme from localStorage or fallback to user's system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Apply the theme to the <html> tag whenever it changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode((prev) => !prev)

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        {/* Pass down the state and toggle function to the Header */}
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  )
}

export default AppLayout