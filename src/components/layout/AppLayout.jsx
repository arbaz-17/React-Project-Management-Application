import { Outlet } from 'react-router-dom'

import Header from './Header'
import PageContainer from './PageContainer'
import Sidebar from './Sidebar'

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-main">
        <Header />

        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  )
}

export default AppLayout