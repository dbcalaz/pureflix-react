import "./styles/style.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Peliculas from "./pages/Peliculas";
import ProximosLanzamientos from "./pages/ProximosLanzamientos";
import Perfil from "./pages/Perfil";
import CategoriaBuscador from "./components/CategoriaBuscador";
import { useState } from "react";

function App() {
  const [pestania, setPestania] = useState("home");
  const opciones = [{valor:"vacio", nombreAmostrar:"Seleccionar categoría"},{valor:"accion",nombreAmostrar:"Acción"},
    {valor:"comedia", nombreAmostrar:"Comedia"},{valor:"documentales", nombreAmostrar:"Documentales"},
    {valor:"drama", nombreAmostrar:"Drama"},{valor:"fantasia", nombreAmostrar:"Fantasía"},
    {valor:"familiar", nombreAmostrar:"Familiar"},{valor:"suspenso", nombreAmostrar:"Suspenso"},
    {valor:"aventura", nombreAmostrar:"Aventura"},{valor:"ciencia ficcion", nombreAmostrar:"Ciencia Ficción"},
  {valor:"thriller", nombreAmostrar:"Thriller"}]


  return (
    <>
      <NavBar pestania={pestania} setPestania={setPestania} />
      {pestania === "home" && <Home CategoriaBuscador={CategoriaBuscador} opciones={opciones}/>}
      {pestania === "series" && (
        <Series CategoriaBuscador={CategoriaBuscador} opciones={opciones}/>
      )}
      {pestania === "peliculas" && <Peliculas CategoriaBuscador={CategoriaBuscador} opciones={opciones}/>}
      {pestania === "prox" && <ProximosLanzamientos />}
      {pestania === "perfil" && <Perfil />}
    </>
  );
}

export default App;
