import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Deployments from './pages/Deployments'
import Environment from './pages/Environment'
import Health from './pages/Health'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/environment" element={<Environment />} />
            <Route path="/health" element={<Health />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
