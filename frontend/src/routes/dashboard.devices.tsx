import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { devices as fallbackDevices } from "../data/dashboard";
import type { Device } from "../data/dashboard";
import { apiFetch } from "../lib/api";

export const Route = createFileRoute("/dashboard/devices")({
  component: DevicesPage,
});

function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>(fallbackDevices);

  useEffect(() => {
    apiFetch<Device[]>("/device/all").then((res) => {
      if (res.success && res.data && res.data.length > 0) setDevices(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="dashboard-h1">Devices</h1>
      <p className="dashboard-sub">All connected SmartVent devices in your home.</p>
      <table className="dash-table">
        <thead>
          <tr>
            <th>Name</th><th>Type</th><th>Location</th><th>Status</th><th>Last seen</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((d) => (
            <tr key={d.id}>
              <td><strong>{d.name}</strong></td>
              <td>{d.type}</td>
              <td>{d.location}</td>
              <td><span className={`badge ${d.status === "online" ? "badge-success" : "badge-danger"}`}>{d.status}</span></td>
              <td>{d.lastSeen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
