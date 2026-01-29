import { useEffect, useState } from "react";
import FetchPost from "./FetchPost";

function Recuperar({ setVista }) {
  const [email, setEmail] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [error, setError] = useState("");

  async function envioEmailRecuperacion() {
    const datos = {
      email: email,
      nombre_usuario: nombreUsuario,
    };

    try {
      const res = await FetchPost("recuperarContrasena", datos);

      if (!res.ok) {
        const err = await res.json();
        setError(err.mensaje || "Error al enviar email de recuperación");
        console.error(err.mensaje);
        return;
      }

      console.log("Email de recuperación enviado con éxito.");
    } catch (e) {
      console.error(e);
      setError("Error de conexión");
    }
  }

  return (
    <>
      <div className="recover-container">
        <h1>Recuperar contraseña</h1>

        <form className="recover-form">
          <div className="recover-field">
            <label htmlFor="gmail">E-mail</label>
            <input
              type="email"
              placeholder="Ingrese email"
              name="gmail"
              id="gmail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="recover-field">
            <label htmlFor="usuario">Nombre de usuario</label>
            <input
              type="text"
              placeholder="Ingrese nombre de usuario"
              name="user"
              id="usuario"
              onChange={(e) => setNombreUsuario(e.target.value)}
            />
          </div>

          <section className="recover-actions">
            <button
              className="recover-button recover-button--submit"
              type="submit"
              disabled={!email || !nombreUsuario}
              onClick={envioEmailRecuperacion}
            >
              Enviar email
            </button>

            <button
              className="recover-button recover-button--cancel"
              onClick={() => setVista("login")}
              type="button"
            >
              Volver
            </button>
          </section>
        </form>
      </div>
    </>
  );
}

export default Recuperar;
