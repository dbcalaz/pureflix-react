import { useState, useEffect } from "react";
import ImagenExterna from "./ImagenExterna";

function PerfilMobile({
  usuario,
  setMostrarModalFotoPerfil,
  setFavoritos,
  favoritos,
  setNotificaciones,
  notificaciones,
  setMostrarModalDetalle,
  setMostrarMenu,
  actualizarDatosUsuario,
  setVistaPerfil,
}) {
  const [datosUsuario, setDatosUsuario] = useState(null);

  const servidor = import.meta.env.VITE_SERVER;
  const puerto = import.meta.env.VITE_PORT;

  useEffect(() => {
    const getDatosUsuario = async () => {
      const res = await fetch(
        `http://${servidor}:${puerto}/getDatosUsuario?token=${usuario.token}`,
      );
      const data = await res.json();
      setDatosUsuario(data);
    };

    getDatosUsuario();
  }, [actualizarDatosUsuario]);

  async function obtenerNotificaciones() {
    try {
      const url = `http://${servidor}:${puerto}/getContenido?token=${usuario.token}&notificacion=true&proximo=true`;
      const res = await fetch(url);
      const data = await res.json();
      setNotificaciones(data);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  useEffect(() => {
    obtenerNotificaciones();
  }, [usuario.token]);

  async function obtenerFavoritos() {
    try {
      const url = `http://${servidor}:${puerto}/getContenido?token=${usuario.token}&favorito=true`;
      const res = await fetch(url);
      const data = await res.json();
      setFavoritos(data);
    } catch (e) {
      console.log("Error:", e);
    }
  }

  useEffect(() => {
    obtenerFavoritos();
  }, [usuario.token]);

  return (
    <>
      <div className="perfil-mobile">
        <header className="perfil-mobile__header">
          <h1>Mi Pureflix</h1>

          <ImagenExterna
            nombreImagen="menu.svg"
            className="perfil-mobile__menu"
            onClick={() => setMostrarMenu(true)}
          />
        </header>

        <section className="perfil-mobile__usuario">
          <div className="perfil-mobile__foto">
            <ImagenExterna
              nombreImagen={datosUsuario?.foto_perfil}
              className="perfil-mobile__foto-img"
            />
            <ImagenExterna
              nombreImagen="edit.svg"
              className="perfil-mobile__foto-edit"
              onClick={() => setMostrarModalFotoPerfil(true)}
            />
          </div>

          <p className="perfil-mobile__nombre">
            {datosUsuario?.nombre_usuario}
          </p>
        </section>

        <section className="perfil-mobile__listas">
          <h2>Mi lista</h2>
          <div className="perfil-mobile__carrusel">
            {favoritos?.map((p, i) => (
              <div
                key={i}
                className="perfil-mobile__carrusel-item"
                onClick={() => setMostrarModalDetalle(p)}
              >
                <ImagenExterna nombreImagen={p.imagen} />
              </div>
            ))}
          </div>
        </section>

        <section className="perfil-mobile__listas">
          <h2>Próximos lanzamientos</h2>
          <div className="perfil-mobile__carrusel">
            {notificaciones?.map((p, i) => (
              <div
                key={i}
                className="perfil-mobile__carrusel-item"
                onClick={() => setMostrarModalDetalle(p)}
              >
                <ImagenExterna nombreImagen={p.imagen} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default PerfilMobile;
