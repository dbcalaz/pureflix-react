import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import BottomNav from "../components/BottomNav";
import HeaderPrincipal from "../components/HeaderPrincipal";
import Galeria from "../components/Galeria";
import ModalDetalle from "../components/ModalDetalle";
import Perfil from "../components/Perfil";
import ProximosLanzamientos from "../components/ProximosLanzamientos";
import ModalCancelarSuscripcion from "../components/ModalCancelarSuscripcion";
import ModalFotoPerfil from "../components/ModalFotoPerfil";
import ModalCategorias from "../components/ModalCategorias";
import Buscador from "../components/Buscador";
import NavbarDesktop from "../components/NavbarDesktop";

function HomePage() {
  const { user } = useAuth();

  const [vista, setVista] = useState("");
  const [vistaGlobal, setVistaGlobal] = useState("inicio");

  const [tipo, setTipo] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [catSeleccionada, setCatSeleccionada] = useState(0);
  const [palabra, setPalabra] = useState("");

  const [mostrarModalCategorias, setMostrarModalCategorias] = useState(false);
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

    const x = getCookieVista("vista");

    if (x) {
      if (x === "series") setTipo(2);
      if (x === "peliculas") setTipo(1);

      setVista(x);
    } else {
      setVista("home");
      setTipo(0);
    }
  }, []);

  useEffect(() => {
    if (vistaGlobal === "inicio") {
      setVista("home");
      setTipo(0);
    }

    if (vistaGlobal === "proximos") {
      setVista("proximos");
    }

    if (vistaGlobal === "perfil") {
      setVista("perfil");
    }
  }, [vistaGlobal]);

  return (
    <>
      <NavbarDesktop
        setVistaGlobal={setVistaGlobal}
        setVista={setVista}
        user={user}
        setTipo={setTipo}
        setPalabra={setPalabra}
        palabra={palabra}
      />

      <HeaderPrincipal
        vista={vista}
        setVista={setVista}
        tipo={tipo}
        setTipo={setTipo}
        categorias={categorias}
        catSeleccionada={catSeleccionada}
        setCatSeleccionada={setCatSeleccionada}
        abrirCategorias={() => setMostrarModalCategorias(true)}
      />
      {mostrarModalCategorias && (
        <ModalCategorias
          categorias={categorias}
          catSeleccionada={catSeleccionada}
          setCatSeleccionada={setCatSeleccionada}
          onClose={() => setMostrarModalCategorias(false)}
        />
      )}

      {(vista === "home" || vista === "series" || vista === "peliculas") && (
        <>
          <Galeria
            tipo={tipo}
            setMostrarModalDetalle={setMostrarModalDetalle}
            catSeleccionada={catSeleccionada}
            setCatSeleccionada={setCatSeleccionada}
            palabra={palabra}
          />
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
        </>
      )}

      {vista === "proximos" && (
        <ProximosLanzamientos
          setMostrarModalDetalle={setMostrarModalDetalle}
          setVistaGlobal={setVistaGlobal}
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

      {vistaGlobal === "buscar" && (
        <Buscador
          setVistaGlobal={setVistaGlobal}
          setPalabra={setPalabra}
          palabra={palabra}
        />
      )}

      <BottomNav
        vistaGlobal={vistaGlobal}
        setVistaGlobal={setVistaGlobal}
        user={user}
      />
    </>
  );
}

export default HomePage;
