import "./KpiCard.css";

export function KpiCard({ label, value, unit, accent = "primary", children }) {
  return (
    <div className={`kpi-card card kpi-${accent}`}>
      <span className="kpi-label">{label}</span>
      <div className="kpi-value">
        {value}
        {unit && <span className="kpi-unit">{unit}</span>}
      </div>
      {children}
    </div>
  );
}
