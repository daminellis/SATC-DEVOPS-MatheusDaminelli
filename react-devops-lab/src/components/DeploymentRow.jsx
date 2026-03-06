function DeploymentRow({ deployment, onDelete }) {
  const statusColors = {
    success: '#10b981',
    failed: '#ef4444',
    rollback: '#f59e0b',
  }

  return (
    <tr className="deployment-row">
      <td className="mono">{deployment.version}</td>
      <td>{deployment.environment}</td>
      <td>
        <span
          className="status-badge small"
          style={{ backgroundColor: statusColors[deployment.status] }}
        >
          {deployment.status}
        </span>
      </td>
      <td>{deployment.date}</td>
      <td>{deployment.author}</td>
      <td>
        <button className="btn-delete" onClick={() => onDelete(deployment.id)}>
          ✕
        </button>
      </td>
    </tr>
  )
}

export default DeploymentRow
