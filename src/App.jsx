import "./styles/style.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Peliculas from "./pages/Peliculas";
import ProximosLanzamientos from "./pages/ProximosLanzamientos";
import Perfil from "./pages/Perfil";
import CategoriaBuscador from "./components/CategoriaBuscador";
import Contenido from "./data/Contenido";
import { useState } from "react";
import ModalDetalle from "./components/ModalDetalle";

function App() {
  const [pestania, setPestania] = useState("home");
  const opciones = [
    { valor: "vacio", nombreAmostrar: "Seleccionar categoría" },
    { valor: "accion", nombreAmostrar: "Acción" },
    { valor: "comedia", nombreAmostrar: "Comedia" },
    { valor: "documentales", nombreAmostrar: "Documentales" },
    { valor: "drama", nombreAmostrar: "Drama" },
    { valor: "fantasia", nombreAmostrar: "Fantasía" },
    { valor: "familiar", nombreAmostrar: "Familiar" },
    { valor: "suspenso", nombreAmostrar: "Suspenso" },
    { valor: "aventura", nombreAmostrar: "Aventura" },
    { valor: "ciencia ficcion", nombreAmostrar: "Ciencia Ficción" },
    { valor: "thriller", nombreAmostrar: "Thriller" },
  ];
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState({});

  return (
    <>
      <NavBar pestania={pestania} setPestania={setPestania} setMostrarModalDetalle={setMostrarModalDetalle}  />
      {pestania === "home" && (
        <Home
          CategoriaBuscador={CategoriaBuscador}
          opciones={opciones}
          contenido={Contenido}
          setMostrarModalDetalle={setMostrarModalDetalle}
        />
      )}
      {pestania === "series" && (
        <Series
          CategoriaBuscador={CategoriaBuscador}
          opciones={opciones}
          contenido={Contenido.filter((f) => f.tipo === "serie")}
          setMostrarModalDetalle={setMostrarModalDetalle}
        />
      )}
      {pestania === "peliculas" && (
        <Peliculas
          CategoriaBuscador={CategoriaBuscador}
          opciones={opciones}
          contenido={Contenido.filter((f) => f.tipo === "pelicula")}
          setMostrarModalDetalle={setMostrarModalDetalle}
        />
      )}
      {pestania === "prox" && <ProximosLanzamientos />}
      {pestania === "perfil" && <Perfil />}
      {mostrarModalDetalle?.id && (
        <ModalDetalle setMostrarModalDetalle={setMostrarModalDetalle} d={mostrarModalDetalle}/>
      )}
    </>
  );
}

export default App;
