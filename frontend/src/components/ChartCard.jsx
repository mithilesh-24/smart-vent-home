import "./ChartCard.css";

export function ChartCard({ title, subtitle, children }) {
  return (
    <div className="chart-card card">
      <div className="chart-card-head">
        <h3>{title}</h3>
        {subtitle && <span className="text-muted">{subtitle}</span>}
      </div>
      <div className="chart-card-body">{children}</div>
    </div>
  );
}
