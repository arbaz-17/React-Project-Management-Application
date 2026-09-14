import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import PageContainer from "./PageContainer";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  function toggleSidebarCollapsed() {
    setSidebarCollapsed((currentValue) => !currentValue);
  }

  function openMobileSidebar() {
    setMobileSidebarOpen(true);
  }

  function closeMobileSidebar() {
    setMobileSidebarOpen(false);
  }

  useEffect(() => {
    if (!mobileSidebarOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeMobileSidebar();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileSidebarOpen]);

  return (
    <div className="app-layout">
      <Sidebar
        isCollapsed={sidebarCollapsed}
        isMobileOpen={mobileSidebarOpen}
        onToggleCollapsed={toggleSidebarCollapsed}
        onCloseMobile={closeMobileSidebar}
      />

      {mobileSidebarOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          onClick={closeMobileSidebar}
          aria-label="Close navigation menu"
        />
      )}

      <div className="app-main">
        <Header
          isSidebarCollapsed={sidebarCollapsed}
          isMobileSidebarOpen={mobileSidebarOpen}
          onToggleSidebar={toggleSidebarCollapsed}
          onOpenMobileSidebar={openMobileSidebar}
        />

        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  );
}

export default AppLayout;
