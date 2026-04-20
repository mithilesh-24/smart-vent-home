import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KpiCard } from "../components/KpiCard.jsx";
import { ChartCard } from "../components/ChartCard.jsx";
import { timeSeries as fallbackTimeSeries, devices as fallbackDevices } from "../data/dashboard.js";
import { apiFetch } from "../lib/api.js";

export default function DashboardOverview() {
  const [timeSeries, setTimeSeries] = useState(fallbackTimeSeries);
  const [devices, setDevices] = useState(fallbackDevices);
  const [fanOn, setFanOn] = useState(true);

  useEffect(() => {
    apiFetch("/device/history").then((res) => {
      if (res.success && res.data && res.data.length > 0) setTimeSeries(res.data);
    });
    apiFetch("/device/all").then((res) => {
      if (res.success && res.data && res.data.length > 0) setDevices(res.data);
    });
  }, []);

  const latest = timeSeries[timeSeries.length - 1];

  return (
    <div>
      <h1 className="dashboard-h1">Overview</h1>
      <p className="dashboard-sub">Real-time air quality and device status across your home.</p>

      <div className="kpi-grid">
        <KpiCard label="Air Quality Index" value={latest.aqi} accent="primary" />
        <KpiCard label="Temperature" value={latest.temperature} unit="°C" accent="accent" />
        <KpiCard label="Humidity" value={latest.humidity} unit="%" accent="cta" />
        <KpiCard label="Fan Status" value={fanOn ? "ON" : "OFF"} accent={fanOn ? "accent" : "danger"}>
          <button className={`fan-toggle ${fanOn ? "" : "off"}`} onClick={() => setFanOn((v) => !v)}>Toggle</button>
        </KpiCard>
      </div>

      <div className="charts-grid">
        <ChartCard title="AQI — Last 24h" subtitle="Lower is better">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="aqi" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Temperature — Last 24h" subtitle="°C">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeries}>
              <defs>
                <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Area type="monotone" dataKey="temperature" stroke="#10b981" strokeWidth={2} fill="url(#tempGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Recent device events">
        <table className="dash-table">
          <thead>
            <tr><th>Device</th><th>Location</th><th>Status</th><th>Last seen</th></tr>
          </thead>
          <tbody>
            {devices.slice(0, 5).map((d) => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td>{d.location}</td>
                <td><span className={`badge ${d.status === "online" ? "badge-success" : "badge-danger"}`}>{d.status}</span></td>
                <td>{d.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ChartCard>
    </div>
  );
}
