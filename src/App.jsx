import { useState } from "react";
import "./styles/galeria.css";
import "./styles/serie_pelicula.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Galeria from "./components/Galeria";
import ModalDetalle from "./components/ModalDetalle";
import Filtros from "./components/Filtros";

function App() {
  const [tipo, setTipo] = useState(0);
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [catSeleccionada, setCatSeleccionada] = useState(0);

  return (
    <>
      <NavBar tipo={tipo} setTipo={setTipo} />
      <Filtros
        categorias={categorias}
        setCategorias={setCategorias}
        catSeleccionada={catSeleccionada}
        setCatSeleccionada={setCatSeleccionada}
      />
      <Galeria
        tipo={tipo}
        setMostrarModalDetalle={setMostrarModalDetalle}
        categorias={categorias}
        setCategorias={setCategorias}
        catSeleccionada={catSeleccionada}
        setCatSeleccionada={setCatSeleccionada}
      />
      {mostrarModalDetalle.id > 0 && (
        <ModalDetalle
          mostrar={mostrarModalDetalle}
          setMostrar={setMostrarModalDetalle}
        />
      )}
    </>
  );
}

export default App;
