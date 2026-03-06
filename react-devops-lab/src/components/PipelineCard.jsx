function PipelineCard({ name, branch, status, duration, commit }) {
  const statusColors = {
    success: '#10b981',
    failed: '#ef4444',
    running: '#f59e0b',
  }

  const statusLabels = {
    success: 'Sucesso',
    failed: 'Falhou',
    running: 'Rodando',
  }

  return (
    <div className="pipeline-card">
      <div className="pipeline-header">
        <h3>{name}</h3>
        <span
          className="status-badge"
          style={{ backgroundColor: statusColors[status] }}
        >
          {status === 'running' && <span className="pulse" />}
          {statusLabels[status]}
        </span>
      </div>
      <div className="pipeline-details">
        <div className="pipeline-detail">
          <span className="label">Branch</span>
          <span className="value">{branch}</span>
        </div>
        <div className="pipeline-detail">
          <span className="label">Duração</span>
          <span className="value">{duration}</span>
        </div>
        <div className="pipeline-detail">
          <span className="label">Commit</span>
          <span className="value mono">{commit}</span>
        </div>
      </div>
    </div>
  )
}

export default PipelineCard
