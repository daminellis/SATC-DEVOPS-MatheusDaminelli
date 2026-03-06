function MetricCard({ label, value, max, unit, color }) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="metric-label">{label}</span>
        <span className="metric-value">
          {value}{unit} <span className="metric-max">/ {max}{unit}</span>
        </span>
      </div>
      <div className="metric-bar-bg">
        <div
          className="metric-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: percentage > 80 ? '#ef4444' : color,
          }}
        />
      </div>
    </div>
  )
}

export default MetricCard
