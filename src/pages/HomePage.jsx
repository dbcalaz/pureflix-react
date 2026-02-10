import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import NavBar from "../components/NavBar";
import Galeria from "../components/Galeria";
import ModalDetalle from "../components/ModalDetalle";
import Filtros from "../components/Filtros";
import Perfil from "../components/Perfil";
import ProximosLanzamientos from "../components/ProximosLanzamientos";
import ModalCancelarSuscripcion from "../components/ModalCancelarSuscripcion";
import ModalFotoPerfil from "../components/ModalFotoPerfil";

function HomePage() {
  const { user } = useAuth(); // usuario logueado
  const [vista, setVista] = useState("home");
  const [tipo, setTipo] = useState(0);
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState({});
  const [categorias, setCategorias] = useState([]);
  const [catSeleccionada, setCatSeleccionada] = useState(0);
  const [palabra, setPalabra] = useState("");
  const [mostrarModalCancelarSuscripcion, setMostrarModalCancelarSuscripcion] =
    useState(false);
  const [mostrarModalFotoPerfil, setMostrarModalFotoPerfil] = useState(false);
  const [actualizarDatosUsuario, setActualizarDatosUsuario] = useState(false);

  useEffect(() => {
  if (actualizarDatosUsuario) {
    setActualizarDatosUsuario(false);
  }
}, [actualizarDatosUsuario]);


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
            catSeleccionada={catSeleccionada}
            setCatSeleccionada={setCatSeleccionada}
            palabra={palabra}
            setPalabra={setPalabra}
          />

          {mostrarModalDetalle?.id > 0 && (
            <ModalDetalle
              mostrar={mostrarModalDetalle}
              setMostrar={setMostrarModalDetalle}
            />
          )}
        </>
      )}

      {vista === "perfil" && (
        <>
          <Perfil
            setVista={setVista}
            setMostrarModalCancelarSuscripcion={
              setMostrarModalCancelarSuscripcion
            }
            setMostrarModalFotoPerfil={setMostrarModalFotoPerfil}
            usuario={user}
            actualizarDatosUsuario={actualizarDatosUsuario}
          />

          {mostrarModalFotoPerfil && (
            <ModalFotoPerfil
              mostrarModalFotoPerfil={mostrarModalFotoPerfil}
              setMostrarModalFotoPerfil={setMostrarModalFotoPerfil}
              usuario={user}
              setActualizarDatosUsuario={setActualizarDatosUsuario}
            />
          )}

          {mostrarModalCancelarSuscripcion && (
            <ModalCancelarSuscripcion
              onConfirmar={() => {
                // futuro: darDeBajaUsuario()
                setMostrarModalCancelarSuscripcion(false);
              }}
              onCancelar={() => setMostrarModalCancelarSuscripcion(false)}
            />
          )}
        </>
      )}

      {vista === "proximos" && <ProximosLanzamientos />}
    </>
  );
}

export default HomePage;
