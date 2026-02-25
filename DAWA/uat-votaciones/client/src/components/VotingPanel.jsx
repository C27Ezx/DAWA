import { useState, useEffect } from 'react'

function VotingPanel({ usuario, token, onVotoRegistrado }) {
  const [candidatos, setCandidatos] = useState([])
  const [votando, setVotando] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    cargarCandidatos()
  }, [token])

  const cargarCandidatos = async () => {
    try {
      const response = await fetch('/api/candidatos', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setCandidatos(data)
    } catch (err) {
      setError('Error al cargar candidatos')
    }
  }

  const confirmarVoto = (candidato) => {
    setVotando(candidato)
  }

  const cancelarVoto = () => {
    setVotando(null)
  }

  const emitirVoto = async (candidatoId) => {
    setError('')
    setMensaje('')
    
    try {
      const response = await fetch('/api/votar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ candidatoId })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error al emitir voto')
        return
      }

      setMensaje(data.mensaje)
      onVotoRegistrado()
      setVotando(null)
    } catch (err) {
      setError('Error de conexion')
    }
  }

  if (usuario.haVotado) {
    return (
      <div className="flex justify-center mt-8">
        <div className="card-uat max-w-lg text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#002F6C] mb-4">
            Gracias por tu participacion
          </h2>
          <p className="text-gray-600">
            Tu voto ha sido registrado exitosamente. 
            La democracia universitaria depende de la participacion activa de todos.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Matricula: {usuario.matricula} - {usuario.facultad}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#002F6C]">Eleccion Representante Estudiantil</h2>
        <p className="text-gray-600 mt-2">Bienvenido, {usuario.nombre}. Selecciona tu candidato.</p>
      </div>

      {mensaje && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-center">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
          {error}
        </div>
      )}

      {votando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl">
            <h3 className="text-xl font-bold text-[#002F6C] mb-4">Confirmar Voto</h3>
            <p className="text-gray-600 mb-6">
              Estas a punto de votar por <strong className="text-[#d14900]">{votando.nombre}</strong>. 
              Esta accion no se puede deshacer.
            </p>
            <div className="flex gap-4">
              <button
                onClick={cancelarVoto}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={() => emitirVoto(votando.id)}
                className="flex-1 btn-uat-primary"
              >
                Confirmar Voto
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidatos.map((candidato) => (
          <div key={candidato.id} className="card-uat hover:shadow-xl transition-all duration-300">
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#002F6C] to-[#0044a8] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {candidato.nombre.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-[#002F6C] text-center mb-2">
              {candidato.nombre}
            </h3>
            
            <p className="text-center text-[#d14900] font-semibold mb-4">
              {candidato.partido}
            </p>
            
            <p className="text-gray-600 text-sm text-center mb-6">
              {candidato.descripcion}
            </p>
            
            <button
              onClick={() => confirmarVoto(candidato)}
              className="w-full btn-uat-primary"
            >
              Votar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VotingPanel
