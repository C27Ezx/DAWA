import { useState, useEffect } from 'react'
import Login from './components/Login'
import VotingPanel from './components/VotingPanel'
import AdminPanel from './components/AdminPanel'
import Header from './components/Header'

function App() {
  const [usuario, setUsuario] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  useEffect(() => {
    if (token) {
      const savedUser = localStorage.getItem('usuario')
      if (savedUser) {
        setUsuario(JSON.parse(savedUser))
      }
    }
  }, [token])

  const handleLogin = (userData, tokenData) => {
    localStorage.setItem('token', tokenData)
    localStorage.setItem('usuario', JSON.stringify(userData))
    setUsuario(userData)
    setToken(tokenData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
    setToken(null)
  }

  const handleVotoRegistrado = () => {
    const usuarioActualizado = { ...usuario, haVotado: true }
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado))
    setUsuario(usuarioActualizado)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header usuario={usuario} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {!token && !usuario ? (
          <Login onLogin={handleLogin} />
        ) : usuario?.rol === 'admin' ? (
          <AdminPanel token={token} />
        ) : (
          <VotingPanel 
            usuario={usuario} 
            token={token} 
            onVotoRegistrado={handleVotoRegistrado} 
          />
        )}
      </main>
      
      <footer className="bg-[#002F6C] text-white py-4 text-center mt-8">
        <p className="text-sm">
          Universidad Autonoma de Tamaulipas - Sistema de Votaciones Estudiantiles 2024
        </p>
      </footer>
    </div>
  )
}

export default App
