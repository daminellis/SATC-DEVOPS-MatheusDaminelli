import { useState, useEffect } from 'react'

const SERVICES = [
  { name: 'frontend', endpoint: '/api/frontend', status: 'healthy', latency: 42 },
  { name: 'backend-api', endpoint: '/api/v1', status: 'healthy', latency: 87 },
  { name: 'database', endpoint: 'postgres://db:5432', status: 'healthy', latency: 12 },
  { name: 'redis-cache', endpoint: 'redis://cache:6379', status: 'healthy', latency: 3 },
  { name: 'message-queue', endpoint: 'amqp://mq:5672', status: 'degraded', latency: 312 },
  { name: 'auth-service', endpoint: '/api/auth', status: 'healthy', latency: 56 },
]

function Health() {
  const [services, setServices] = useState(SERVICES)
  const [lastCheck, setLastCheck] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setServices(prev => prev.map(s => ({
        ...s,
        latency: Math.max(2, Math.round(s.latency + (Math.random() - 0.5) * 20)),
      })))
      setLastCheck(new Date())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const healthyCount = services.filter(s => s.status === 'healthy').length
  const degradedCount = services.filter(s => s.status === 'degraded').length
  const downCount = services.filter(s => s.status === 'down').length
  const overallStatus = downCount > 0 ? 'down' : degradedCount > 0 ? 'degraded' : 'healthy'

  const statusColor = {
    healthy: '#10b981',
    degraded: '#f59e0b',
    down: '#ef4444',
  }

  return (
    <div className="page">
      <h1 className="page-title">Health Check</h1>

      <div className="summary-cards">
        <div className="summary-card">
          <span className="summary-number" style={{ color: statusColor[overallStatus], textTransform: 'uppercase' }}>
            {overallStatus}
          </span>
          <span className="summary-label">Status Geral</span>
        </div>
        <div className="summary-card">
          <span className="summary-number" style={{ color: '#10b981' }}>{healthyCount}</span>
          <span className="summary-label">Healthy</span>
        </div>
        <div className="summary-card">
          <span className="summary-number" style={{ color: '#f59e0b' }}>{degradedCount}</span>
          <span className="summary-label">Degraded</span>
        </div>
        <div className="summary-card">
          <span className="summary-number" style={{ color: '#ef4444' }}>{downCount}</span>
          <span className="summary-label">Down</span>
        </div>
      </div>

      <h2 className="section-title">Serviços</h2>
      <div className="env-grid">
        {services.map((s, i) => (
          <div key={i} className="env-card">
            <span className="env-label">
              <span
                className="status-dot"
                style={{ background: statusColor[s.status], boxShadow: `0 0 6px ${statusColor[s.status]}`, display: 'inline-block', marginRight: '0.5rem' }}
              />
              {s.name}
            </span>
            <span className="env-value">{s.endpoint}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Latência: <span className="mono" style={{ color: statusColor[s.status] }}>{s.latency}ms</span>
            </span>
          </div>
        ))}
      </div>

      <h2 className="section-title">Health Endpoint Response</h2>
      <div className="env-card" style={{ fontFamily: 'Courier New, monospace', fontSize: '0.85rem' }}>
        <span className="env-label">GET /health</span>
        <pre style={{ color: 'var(--green)', margin: 0, whiteSpace: 'pre-wrap' }}>
{JSON.stringify({
  status: overallStatus,
  timestamp: lastCheck.toISOString(),
  uptime: `${Math.floor(performance.now() / 1000)}s`,
  services: services.reduce((acc, s) => ({ ...acc, [s.name]: { status: s.status, latency_ms: s.latency } }), {}),
}, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default Health
