import { Link } from "@tanstack/react-router";
import "./DashboardSidebar.css";

const links = [
  { to: "/dashboard" as const, label: "Overview", exact: true },
  { to: "/dashboard/devices" as const, label: "Devices" },
  { to: "/dashboard/analytics" as const, label: "Analytics" },
  { to: "/dashboard/orders" as const, label: "Orders" },
];

export function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-title">Dashboard</div>
      <nav>
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.exact }}
            activeProps={{ className: "active" }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="dashboard-sidebar-status">
        <span className="status-dot" />
        System Online
      </div>
    </aside>
  );
}
