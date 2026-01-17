import { useState } from "react";
import "./styles/galeria.css";
import "./styles/serie_pelicula.css";
import "./styles/perfil.css";
import "./App.css";

import NavBar from "./components/NavBar";
import Galeria from "./components/Galeria";
import ModalDetalle from "./components/ModalDetalle";
import Filtros from "./components/Filtros";
import Perfil from "./components/Perfil";

function App() {
  const [vista, setVista] = useState("home");
  const [tipo, setTipo] = useState(0);
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [catSeleccionada, setCatSeleccionada] = useState(0);
  const [palabra, setPalabra] = useState("");

  return (
    <>
      <NavBar vista={vista} setVista={setVista} setTipo={setTipo} />

      {(vista === "home" || vista === "series" || vista === "peliculas") && (
        <>
          <Filtros
            categorias={categorias}
            setCategorias={setCategorias}
            catSeleccionada={catSeleccionada}
            setCatSeleccionada={setCatSeleccionada}
            palabra={palabra}
            setPalabra={setPalabra}
          />
          <Galeria
            tipo={tipo}
            setMostrarModalDetalle={setMostrarModalDetalle}
            setCatSeleccionada={setCatSeleccionada}
            palabra={palabra}
            setPalabra={setPalabra}
          />
          {mostrarModalDetalle.id > 0 && (
            <ModalDetalle
              mostrar={mostrarModalDetalle}
              setMostrar={setMostrarModalDetalle}
            />
          )}
        </>
      )}

      {vista === "perfil" && <Perfil />}
    </>
  );
}

export default App;
