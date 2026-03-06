import { useState, useEffect } from 'react'
import DeploymentRow from '../components/DeploymentRow'

const INITIAL_DEPLOYMENTS = [
  { id: 1, version: 'v1.0.0', environment: 'production', status: 'success', date: '2026-03-01 14:30', author: 'Matheus' },
  { id: 2, version: 'v1.0.1', environment: 'staging', status: 'success', date: '2026-03-02 09:15', author: 'Matheus' },
  { id: 3, version: 'v1.1.0-beta', environment: 'staging', status: 'failed', date: '2026-03-03 16:45', author: 'CI Bot' },
  { id: 4, version: 'v1.0.2', environment: 'production', status: 'rollback', date: '2026-03-04 11:00', author: 'Matheus' },
]

function Deployments() {
  const [deployments, setDeployments] = useState(() => {
    const saved = localStorage.getItem('devops-deployments')
    return saved ? JSON.parse(saved) : INITIAL_DEPLOYMENTS
  })

  const [form, setForm] = useState({
    version: '',
    environment: 'staging',
    status: 'success',
    author: '',
  })

  useEffect(() => {
    localStorage.setItem('devops-deployments', JSON.stringify(deployments))
  }, [deployments])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.version || !form.author) return

    const newDeploy = {
      id: Date.now(),
      ...form,
      date: new Date().toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'short' }),
    }
    setDeployments(prev => [newDeploy, ...prev])
    setForm({ version: '', environment: 'staging', status: 'success', author: '' })
  }

  const handleDelete = (id) => {
    setDeployments(prev => prev.filter(d => d.id !== id))
  }

  return (
    <div className="page">
      <h1 className="page-title">Deployments</h1>

      <div className="deploy-form-card">
        <h2 className="section-title">Novo Deploy</h2>
        <form className="deploy-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Versão</label>
            <input
              type="text"
              placeholder="v1.2.0"
              value={form.version}
              onChange={e => setForm(f => ({ ...f, version: e.target.value }))}
            />
          </div>
          <div className="form-group">
            <label>Ambiente</label>
            <select value={form.environment} onChange={e => setForm(f => ({ ...f, environment: e.target.value }))}>
              <option value="development">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              <option value="success">Sucesso</option>
              <option value="failed">Falhou</option>
              <option value="rollback">Rollback</option>
            </select>
          </div>
          <div className="form-group">
            <label>Autor</label>
            <input
              type="text"
              placeholder="Nome"
              value={form.author}
              onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn-submit">Registrar Deploy</button>
        </form>
      </div>

      <h2 className="section-title">Histórico ({deployments.length})</h2>
      <div className="table-container">
        <table className="deploy-table">
          <thead>
            <tr>
              <th>Versão</th>
              <th>Ambiente</th>
              <th>Status</th>
              <th>Data</th>
              <th>Autor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {deployments.map(dep => (
              <DeploymentRow key={dep.id} deployment={dep} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
        {deployments.length === 0 && (
          <p className="empty-state">Nenhum deploy registrado.</p>
        )}
      </div>
    </div>
  )
}

export default Deployments
