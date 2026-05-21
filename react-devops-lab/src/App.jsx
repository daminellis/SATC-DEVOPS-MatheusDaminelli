import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Deployments from './pages/Deployments'
import Environment from './pages/Environment'
import Health from './pages/Health'
import './App.css'

function App() {
  const [page, setPage] = useState('dashboard')

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <Dashboard />
      case 'deployments': return <Deployments />
      case 'environment': return <Environment />
      case 'health': return <Health />
      default: return <Dashboard />
    }
  }

  return (
    <div className="app-layout">
      <Navbar currentPage={page} onNavigate={setPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
