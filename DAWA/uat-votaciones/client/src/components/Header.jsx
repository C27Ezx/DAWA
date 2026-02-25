function Header({ usuario, onLogout }) {
  return (
    <header className="bg-gradient-to-r from-[#d14900] to-[#F05A28] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-[#002F6C] font-bold text-xl">UAT</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Sistema de Votaciones UAT</h1>
              <p className="text-sm opacity-90">Universidad Autonoma de Tamaulipas</p>
            </div>
          </div>
          
          {usuario && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold">{usuario.nombre}</p>
                <p className="text-sm opacity-80">
                  {usuario.rol === 'admin' ? 'Administrador' : `Alumno - ${usuario.facultad}`}
                </p>
              </div>
              <button 
                onClick={onLogout}
                className="bg-white text-[#d14900] px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                Cerrar Sesion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
