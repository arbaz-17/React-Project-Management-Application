import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './styles/base.css'
import './styles/components.css'
import './styles/features.css'
import './styles/layout.css'
import './styles/theme.css'


import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)