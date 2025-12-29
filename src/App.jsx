import { useState } from 'react'
import './App.css'
import './styles/galeria.css'
import './styles/serie_pelicula.css'
import NavBar from './components/NavBar'
import Galeria from './components/Galeria'

function App() {
 const [tipo, setTipo] = useState ("")
  return (
    <>
      <NavBar tipo={tipo} setTipo={setTipo}/>
      <Galeria tipo={tipo}/>
    </>
  )
}

export default App
