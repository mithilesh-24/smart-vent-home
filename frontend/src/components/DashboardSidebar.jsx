import { NavLink } from "react-router-dom";
import "./DashboardSidebar.css";

const links = [
  { to: "/dashboard", label: "Overview", end: true },
  { to: "/dashboard/orders", label: "Orders" },
  { to: "/dashboard/devices", label: "Devices" },
  { to: "/dashboard/analytics", label: "Analytics" },
];

export function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <h2>Dashboard</h2>
      <nav>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
