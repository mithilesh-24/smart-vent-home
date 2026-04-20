import { Outlet } from "react-router-dom";
import { PageLayout } from "../components/PageLayout.jsx";
import { ProtectedRoute } from "../components/ProtectedRoute.jsx";
import { DashboardSidebar } from "../components/DashboardSidebar.jsx";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <PageLayout hideFooter>
        <div className="container page dashboard-layout">
          <DashboardSidebar />
          <div className="dashboard-content">
            <Outlet />
          </div>
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
}
