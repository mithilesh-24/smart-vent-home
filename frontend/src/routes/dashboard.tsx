import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageLayout } from "../components/PageLayout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { DashboardSidebar } from "../components/DashboardSidebar";
import "../styles/Dashboard.css";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SmartVent" }] }),
  component: () => (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
});

function DashboardLayout() {
  return (
    <PageLayout hideFooter>
      <div className="container page dashboard-layout">
        <DashboardSidebar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </PageLayout>
  );
}
