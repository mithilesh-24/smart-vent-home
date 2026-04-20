import "./KpiCard.css";

export function KpiCard({
  label,
  value,
  unit,
  accent = "primary",
  children,
}: {
  label: string;
  value: string | number;
  unit?: string;
  accent?: "primary" | "accent" | "cta" | "danger";
  children?: React.ReactNode;
}) {
  return (
    <div className={`kpi-card kpi-${accent}`}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">
        {value}
        {unit && <span className="kpi-unit">{unit}</span>}
      </div>
      {children}
    </div>
  );
}
