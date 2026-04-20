import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartCard } from "../components/ChartCard.jsx";
import { roomAqi as fallbackRoomAqi, timeSeries as fallbackTimeSeries } from "../data/dashboard.js";
import { apiFetch } from "../lib/api.js";

export default function DashboardAnalytics() {
  const [timeSeries, setTimeSeries] = useState(fallbackTimeSeries);
  const [roomAqi, setRoomAqi] = useState(fallbackRoomAqi);

  useEffect(() => {
    apiFetch("/device/history").then((res) => {
      if (res.success && res.data && res.data.length > 0) setTimeSeries(res.data);
    });
    apiFetch("/device/room-aqi").then((res) => {
      if (res.success && res.data) setRoomAqi(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="dashboard-h1">Analytics</h1>
      <p className="dashboard-sub">Trends and breakdowns across rooms and time.</p>

      <div className="charts-grid">
        <ChartCard title="Temperature & Humidity" subtitle="Last 24h">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="temperature" stroke="#10b981" strokeWidth={2} dot={false} name="Temp °C" />
              <Line type="monotone" dataKey="humidity" stroke="#2563eb" strokeWidth={2} dot={false} name="Humidity %" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="AQI by Room" subtitle="Current">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={roomAqi}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="room" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip />
              <Bar dataKey="aqi" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
