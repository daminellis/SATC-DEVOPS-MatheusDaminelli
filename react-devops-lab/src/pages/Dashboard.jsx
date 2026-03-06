import { useState, useEffect } from 'react'
import PipelineCard from '../components/PipelineCard'
import MetricCard from '../components/MetricCard'

const PIPELINES = [
  { name: 'frontend-build', branch: 'main', status: 'success', duration: '2m 34s', commit: 'a3f8c12' },
  { name: 'backend-api', branch: 'main', status: 'success', duration: '4m 12s', commit: 'b7d1e45' },
  { name: 'integration-tests', branch: 'develop', status: 'running', duration: '1m 47s', commit: 'c9e2f67' },
  { name: 'deploy-staging', branch: 'release/1.2', status: 'failed', duration: '0m 58s', commit: 'd4a3b89' },
  { name: 'security-scan', branch: 'main', status: 'success', duration: '6m 03s', commit: 'e5f4c01' },
  { name: 'docker-build', branch: 'feature/auth', status: 'running', duration: '3m 21s', commit: 'f6g5d23' },
]

function Dashboard() {
  const [metrics, setMetrics] = useState({
    cpu: 42,
    ram: 6.2,
    disk: 58,
    uptime: 99.7,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.min(100, Math.max(5, prev.cpu + (Math.random() - 0.5) * 10)),
        ram: Math.min(16, Math.max(1, prev.ram + (Math.random() - 0.5) * 0.8)),
        disk: Math.min(100, Math.max(20, prev.disk + (Math.random() - 0.3) * 0.5)),
        uptime: Math.min(100, Math.max(95, prev.uptime + (Math.random() - 0.5) * 0.1)),
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const successCount = PIPELINES.filter(p => p.status === 'success').length
  const failedCount = PIPELINES.filter(p => p.status === 'failed').length
  const runningCount = PIPELINES.filter(p => p.status === 'running').length

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>

      <div className="summary-cards">
        <div className="summary-card">
          <span className="summary-number" style={{ color: '#10b981' }}>{successCount}</span>
          <span className="summary-label">Sucesso</span>
        </div>
        <div className="summary-card">
          <span className="summary-number" style={{ color: '#ef4444' }}>{failedCount}</span>
          <span className="summary-label">Falharam</span>
        </div>
        <div className="summary-card">
          <span className="summary-number" style={{ color: '#f59e0b' }}>{runningCount}</span>
          <span className="summary-label">Rodando</span>
        </div>
        <div className="summary-card">
          <span className="summary-number" style={{ color: '#8b5cf6' }}>{PIPELINES.length}</span>
          <span className="summary-label">Total</span>
        </div>
      </div>

      <h2 className="section-title">Pipelines CI/CD</h2>
      <div className="pipelines-grid">
        {PIPELINES.map((pipeline, i) => (
          <PipelineCard key={i} {...pipeline} />
        ))}
      </div>

      <h2 className="section-title">Métricas do Servidor</h2>
      <div className="metrics-grid">
        <MetricCard label="CPU" value={Math.round(metrics.cpu)} max={100} unit="%" color="#3b82f6" />
        <MetricCard label="RAM" value={parseFloat(metrics.ram.toFixed(1))} max={16} unit=" GB" color="#8b5cf6" />
        <MetricCard label="Disco" value={Math.round(metrics.disk)} max={100} unit="%" color="#f59e0b" />
        <MetricCard label="Uptime" value={parseFloat(metrics.uptime.toFixed(1))} max={100} unit="%" color="#10b981" />
      </div>
    </div>
  )
}

export default Dashboard
