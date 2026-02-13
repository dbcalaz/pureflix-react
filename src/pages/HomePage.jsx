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
  const { user } = useAuth();
  const [vista, setVista] = useState("");

  const [tipo, setTipo] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [catSeleccionada, setCatSeleccionada] = useState(0);
  const [palabra, setPalabra] = useState("");

  const [mostrarModalDetalle, setMostrarModalDetalle] = useState({});
  const [mostrarModalFotoPerfil, setMostrarModalFotoPerfil] = useState(false);
  const [mostrarModalCancelarSuscripcion, setMostrarModalCancelarSuscripcion] =
    useState(false);

  const [actualizarDatosUsuario, setActualizarDatosUsuario] = useState(false);

  const [favoritos, setFavoritos] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);

  
  useEffect(() => {
    if (actualizarDatosUsuario) {
      setActualizarDatosUsuario(false);
    }
  }, [actualizarDatosUsuario]);
  
  useEffect(() => {
    const getCookieVista = (name) => {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const x = getCookieVista("vista") ;
    
    if(x){
      if(x === "series"){
        setTipo(2);
      }
      if(x === "peliculas"){
        setTipo(1);
      }

      setVista(x);
    }else{
      setVista("home")
      setTipo(0);
    }
  }, []);

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
              user={user}
              favoritos={favoritos}
              setFavoritos={setFavoritos}
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
            setMostrarModalDetalle={setMostrarModalDetalle}
            setFavoritos={setFavoritos}
            favoritos={favoritos}
            notificaciones={notificaciones}
            setNotificaciones={setNotificaciones}
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
                setMostrarModalCancelarSuscripcion(false);
              }}
              onCancelar={() => setMostrarModalCancelarSuscripcion(false)}
              user={user}
            />
          )}

          {mostrarModalDetalle?.id > 0 && (
            <ModalDetalle
              mostrar={mostrarModalDetalle}
              setMostrar={setMostrarModalDetalle}
              user={user}
              favoritos={favoritos}
              setFavoritos={setFavoritos}
              notificaciones={notificaciones}
              setNotificaciones={setNotificaciones}
            />
          )}
        </>
      )}

      {vista === "proximos" && (
        <ProximosLanzamientos
          setMostrarModalDetalle={setMostrarModalDetalle}
          notificaciones={notificaciones}
          setNotificaciones={setNotificaciones}
        />
      )}

      {mostrarModalDetalle?.id > 0 && (
        <ModalDetalle
          mostrar={mostrarModalDetalle}
          setMostrar={setMostrarModalDetalle}
          user={user}
          favoritos={favoritos}
          setFavoritos={setFavoritos}
          notificaciones={notificaciones}
          setNotificaciones={setNotificaciones}
        />
      )}
    </>
  );
}

export default HomePage;
