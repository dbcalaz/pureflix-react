import { useState } from "react";

import "./styles/index.scss";

import NavBar from "./components/NavBar";
import Galeria from "./components/Galeria";
import ModalDetalle from "./components/ModalDetalle";
import Filtros from "./components/Filtros";
import Perfil from "./components/Perfil";
import Login from "./components/Login";
import Recuperar from "./components/Recuperar";
import Registro from "./components/Registro";
import ProximosLanzamientos from "./components/ProximosLanzamientos";
import ModalCancelarSuscripcion from "./components/ModalCancelarSuscripcion";

function App() {
  const [vista, setVista] = useState("login");
  const [tipo, setTipo] = useState(0);
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [catSeleccionada, setCatSeleccionada] = useState(0);
  const [palabra, setPalabra] = useState("");
  const [mostrarModalCancelarSuscripcion, setMostrarModalCancelarSuscripcion] =
    useState(false);

  return (
    <>
      {vista === "login" && <Login setVista={setVista} />}

      {vista === "recuperar" && <Recuperar setVista={setVista} />}

      {vista === "registro" && <Registro setVista={setVista} />}

      {(vista === "home" || vista === "series" || vista === "peliculas") && (
        <>
          <NavBar vista={vista} setVista={setVista} setTipo={setTipo} />
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
            catSeleccionada={catSeleccionada}
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

      {vista === "perfil" && (
        <>
          <NavBar vista={vista} setVista={setVista} setTipo={setTipo} />
          <Perfil
            setVista={setVista}
            setMostrarModalCancelarSuscripcion={
              setMostrarModalCancelarSuscripcion
            }
          />
          {mostrarModalCancelarSuscripcion && (
            <ModalCancelarSuscripcion
              onConfirmar={() => {
                // acá en el futuro va el back - darDeBajaUsuario()
                setVista("login");
                setMostrarModalCancelarSuscripcion(false);
              }}
              onCancelar={() => setMostrarModalCancelarSuscripcion(false)}
            />
          )}
        </>
      )}

      {vista === "proximos" && (
        <>
          <NavBar vista={vista} setVista={setVista} setTipo={setTipo} />
          <ProximosLanzamientos />
        </>
      )}
    </>
  );
}

export default App;
