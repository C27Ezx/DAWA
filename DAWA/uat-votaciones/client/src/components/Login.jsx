import { useState } from 'react'

function Login({ onLogin }) {
  const [matricula, setMatricula] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricula, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error al iniciar sesion')
        setCargando(false)
        return
      }

      onLogin(data.usuario, data.token)
    } catch (err) {
      setError('Error de conexion con el servidor')
    }
    
    setCargando(false)
  }

  return (
    <div className="flex justify-center mt-12">
      <div className="card-uat w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#d14900] to-[#F05A28] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-3xl">UAT</span>
          </div>
          <h2 className="text-2xl font-bold text-[#002F6C]">Inicio de Sesion</h2>
          <p className="text-gray-600 mt-2">Ingresa tus credenciales institucionales</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Matricula
            </label>
            <input
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d14900] focus:border-transparent transition-all"
              placeholder="Ej: 20240001"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contrasena
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d14900] focus:border-transparent transition-all"
              placeholder="Tu contrasena"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full btn-uat-primary disabled:opacity-50"
          >
            {cargando ? 'Verificando...' : 'Iniciar Sesion'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Usuarios de prueba:
          </p>
          <div className="mt-2 text-xs text-gray-500 space-y-1">
            <p><strong>Admin:</strong> admin / admin123</p>
            <p><strong>Alumno:</strong> 20240001 / alumno123</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
