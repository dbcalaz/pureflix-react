import { useState } from 'react'
import './App.css'
import './styles/galeria.css'
import './styles/serie_pelicula.css'
import NavBar from './components/NavBar'
import Galeria from './components/Galeria'
import ModalDetalle from './components/ModalDetalle'

function App() {
 const [tipo, setTipo] = useState (0)
 const [mostrarModalDetalle, setMostrarModalDetalle] = useState({})
  return (
    <>
      <NavBar tipo={tipo} setTipo={setTipo}/>
      <Galeria tipo={tipo} setMostrarModalDetalle={setMostrarModalDetalle}/>
      {mostrarModalDetalle.id > 0  && <ModalDetalle mostrar={mostrarModalDetalle} setMostrar={setMostrarModalDetalle}/>}
    </>
  )
}

export default App
