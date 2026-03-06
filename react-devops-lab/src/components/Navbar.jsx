function Navbar({ currentPage, onNavigate }) {
  const links = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'deployments', label: 'Deployments', icon: '⇧' },
    { id: 'environment', label: 'Environment', icon: '⚙' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">{'>'}_</span>
        <span>DevOps Lab</span>
      </div>
      <ul className="navbar-links">
        {links.map(link => (
          <li key={link.id}>
            <button
              className={`navbar-link ${currentPage === link.id ? 'active' : ''}`}
              onClick={() => onNavigate(link.id)}
            >
              <span className="navbar-icon">{link.icon}</span>
              {link.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="navbar-footer">
        <span className="status-dot online" />
        <span>SATC - DevOps</span>
      </div>
    </nav>
  )
}

export default Navbar
