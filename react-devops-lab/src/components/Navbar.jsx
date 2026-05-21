import { NavLink } from 'react-router-dom'

function Navbar() {
  const links = [
    { to: '/', label: 'Dashboard', icon: '⊞', end: true },
    { to: '/deployments', label: 'Deployments', icon: '⇧' },
    { to: '/environment', label: 'Environment', icon: '⚙' },
    { to: '/health', label: 'Health', icon: '♥' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">{'>'}_</span>
        <span>DevOps Lab</span>
      </div>
      <ul className="navbar-links">
        {links.map(link => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
            >
              <span className="navbar-icon">{link.icon}</span>
              {link.label}
            </NavLink>
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
