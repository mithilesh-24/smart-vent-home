import "./ChartCard.css";

export function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="chart-card">
      <div className="chart-card-head">
        <h3>{title}</h3>
        {subtitle && <span>{subtitle}</span>}
      </div>
      <div className="chart-card-body">{children}</div>
    </div>
  );
}
