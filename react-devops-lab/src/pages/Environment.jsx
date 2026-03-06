function Environment() {
  const envInfo = [
    { label: 'Build Mode', value: import.meta.env.MODE },
    { label: 'Base URL', value: import.meta.env.BASE_URL },
    { label: 'Production', value: import.meta.env.PROD ? 'Sim' : 'Não' },
    { label: 'Development', value: import.meta.env.DEV ? 'Sim' : 'Não' },
    { label: 'Build Timestamp', value: new Date().toLocaleString('pt-BR') },
    { label: 'User Agent', value: navigator.userAgent },
    { label: 'Plataforma', value: navigator.platform },
    { label: 'Idioma', value: navigator.language },
    { label: 'Online', value: navigator.onLine ? 'Sim' : 'Não' },
    { label: 'Resolução', value: `${window.screen.width}x${window.screen.height}` },
    { label: 'Viewport', value: `${window.innerWidth}x${window.innerHeight}` },
  ]

  const devopsTools = [
    { name: 'React', version: '18.3.x', category: 'Frontend' },
    { name: 'Vite', version: '6.x', category: 'Build Tool' },
    { name: 'Node.js', version: 'LTS', category: 'Runtime' },
    { name: 'Git', version: '-', category: 'VCS' },
    { name: 'Docker', version: '-', category: 'Container' },
    { name: 'GitHub Actions', version: '-', category: 'CI/CD' },
  ]

  return (
    <div className="page">
      <h1 className="page-title">Environment</h1>

      <h2 className="section-title">Informações do Ambiente</h2>
      <div className="env-grid">
        {envInfo.map((item, i) => (
          <div key={i} className="env-card">
            <span className="env-label">{item.label}</span>
            <span className="env-value">{item.value}</span>
          </div>
        ))}
      </div>

      <h2 className="section-title">Stack de Tecnologias</h2>
      <div className="tech-grid">
        {devopsTools.map((tool, i) => (
          <div key={i} className="tech-card">
            <span className="tech-name">{tool.name}</span>
            <span className="tech-version">{tool.version}</span>
            <span className="tech-category">{tool.category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Environment
