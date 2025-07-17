import './styles/style.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Series from './pages/Series'
import Peliculas from './pages/Peliculas'
import ProximosLanzamientos from './pages/ProximosLanzamientos'
import Perfil from './pages/Perfil'
import { useState } from "react";


function App() {
    const [pestania, setPestania] = useState("home");

  return (
    <>
      <NavBar pestania={pestania} setPestania={setPestania}/>
      {pestania === "home" && <Home/>}
      {pestania === "series" && <Series/>}
      {pestania === "peliculas" && <Peliculas/>}
      {pestania === "prox" && <ProximosLanzamientos/>}
      {pestania === "perfil" && <Perfil/>}
    </>
  )
}

export default App
