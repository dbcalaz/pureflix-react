import ImagenExterna from "./ImagenExterna";
import { useState } from "react";
import FetchPut from "./FetchPut"; 

function ModalFotoPerfil({ setMostrarModalFotoPerfil, usuario, setActualizarDatosUsuario }) {
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeOk, setMensajeOk] = useState("");
  

  async function updateFotoPerfil(foto) {
    setMensajeError("");
    setMensajeOk("");

    const fotoNueva = {
      foto_perfil: foto,
      token: usuario.token,
    };

    try {
      const res = await FetchPut("actualizarFotoPerfil", fotoNueva);

      const data = await res.json();

      if (!res.ok) {
        setMensajeError(data.mensaje || "Error al actualizar la foto");
        return;
      }

      setMensajeOk(data.mensaje || "Foto actualizada con éxito");
      setFotoPerfil(foto);
      setActualizarDatosUsuario(true);
    } catch (e) {
      console.error(e);
      setMensajeError("Error de conexión");
    }
  }

  return (
    <div className="perfil-modal">
      <div
        className="perfil-modal__overlay"
        onClick={() => setMostrarModalFotoPerfil(false)}
      />

      <div className="perfil-modal__contenido">
        <p>Elegí tu foto de perfil</p>

        <div className="perfil-modal__fotos">
          {["avatar1.png", "avatar2.png", "avatar3.png", "avatar4.png", "avatar5.png"].map(
            (avatar) => (
              <ImagenExterna
                key={avatar}
                nombreImagen={avatar}
                className="perfil-modal__foto"
                onClick={() => updateFotoPerfil(avatar)}
              />
            )
          )}
        </div>

        {mensajeError && (
          <p className="perfil-modal__mensaje perfil-modal__mensaje--error">
            {mensajeError}
          </p>
        )}

        {mensajeOk && (
          <p className="perfil-modal__mensaje perfil-modal__mensaje--ok">
            {mensajeOk}
          </p>
        )}
      </div>
    </div>
  );
}

export default ModalFotoPerfil;