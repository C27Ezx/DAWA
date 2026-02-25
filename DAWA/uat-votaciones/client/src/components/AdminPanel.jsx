import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function AdminPanel({ token }) {
  const [resultados, setResultados] = useState([])
  const [totalVotos, setTotalVotos] = useState(0)
  const [configuracion, setConfiguracion] = useState(null)

  useEffect(() => {
    cargarResultados()
    cargarConfiguracion()
    const interval = setInterval(cargarResultados, 5000)
    return () => clearInterval(interval)
  }, [token])

  const cargarResultados = async () => {
    try {
      const response = await fetch('/api/resultados', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setResultados(data.resultados)
      setTotalVotos(data.totalVotos)
    } catch (err) {
      console.error('Error al cargar resultados')
    }
  }

  const cargarConfiguracion = async () => {
    try {
      const response = await fetch('/api/configuracion')
      const data = await response.json()
      setConfiguracion(data)
    } catch (err) {
      console.error('Error al cargar configuracion')
    }
  }

  const datosGrafica = {
    labels: resultados.map(r => r.nombre),
    datasets: [
      {
        label: 'Votos',
        data: resultados.map(r => r.votos),
        backgroundColor: [
          'rgba(209, 73, 0, 0.8)',
          'rgba(0, 47, 108, 0.8)',
          'rgba(240, 90, 40, 0.8)'
        ],
        borderColor: [
          'rgb(209, 73, 0)',
          'rgb(0, 47, 108)',
          'rgb(240, 90, 40)'
        ],
        borderWidth: 2
      }
    ]
  }

  const opcionesGrafica = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Resultados de la Eleccion en Tiempo Real',
        font: { size: 18, weight: 'bold' },
        color: '#002F6C'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#002F6C]">Panel de Administracion</h2>
        <p className="text-gray-600 mt-2">Monitoreo de elecciones en tiempo real</p>
      </div>

      {configuracion && (
        <div className="card-uat mb-8">
          <h3 className="text-xl font-bold text-[#002F6C] mb-4">{configuracion.titulo}</h3>
          <div className="flex gap-8 text-gray-600">
            <p><strong>Inicio:</strong> {configuracion.fecha_inicio}</p>
            <p><strong>Fin:</strong> {configuracion.fecha_fin}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card-uat">
          <div className="h-80">
            <Bar data={datosGrafica} options={opcionesGrafica} />
          </div>
        </div>

        <div className="card-uat">
          <h3 className="text-xl font-bold text-[#002F6C] mb-6">Resumen de Votos</h3>
          
          <div className="mb-6 p-4 bg-gradient-to-r from-[#d14900] to-[#F05A28] text-white rounded-lg text-center">
            <p className="text-sm opacity-80">Total de Votos Emitidos</p>
            <p className="text-4xl font-bold">{totalVotos}</p>
          </div>

          <div className="space-y-4">
            {resultados.map((candidato, index) => (
              <div key={candidato.id || index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-[#002F6C]">{candidato.nombre}</span>
                  <span className="text-[#d14900] font-bold">{candidato.votos} votos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${candidato.porcentaje}%`,
                      backgroundColor: index === 0 ? '#d14900' : index === 1 ? '#002F6C' : '#F05A28'
                    }}
                  ></div>
                </div>
                <p className="text-right text-sm text-gray-500 mt-1">{candidato.porcentaje}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-uat mt-8">
        <h3 className="text-xl font-bold text-[#002F6C] mb-4">Tabla de Resultados</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#002F6C] text-white">
                <th className="px-4 py-3 text-left">Candidato</th>
                <th className="px-4 py-3 text-left">Partido</th>
                <th className="px-4 py-3 text-center">Votos</th>
                <th className="px-4 py-3 text-center">Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((candidato, index) => (
                <tr key={candidato.id || index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 py-3 font-medium">{candidato.nombre}</td>
                  <td className="px-4 py-3 text-gray-600">{candidato.partido}</td>
                  <td className="px-4 py-3 text-center font-bold text-[#d14900]">{candidato.votos}</td>
                  <td className="px-4 py-3 text-center">{candidato.porcentaje}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
