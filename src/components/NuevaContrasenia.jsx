import { useEffect, useState } from "react";
import FetchPut from "./FetchPut";

function NuevaContrasenia({ setVista, token }) {
  const [newPass, setNewPass] = useState("");
  const [newPassRep, setNewPassRep] = useState("");
  const [error, setError] = useState("");

  async function actualizarContrasena() {
    const datos = {
      token: token,
      nueva_contrasena: newPass,
      nueva_contrasena_rep: newPassRep,
    };

    try {
      const res = await FetchPut("actualizarContrasena", datos);

      if (!res.ok) {
        const err = await res.json();
        setError(err.mensaje || "Error al enviar email de recuperación");
        console.error(err.mensaje);
        return;
      }
      console.log("Su contraseña ha sido actualizada con éxito.");
      setVista("login");
    } catch (e) {
      console.error(e);
      setError("Error de conexión");
    }
  }

  return (
    <>
      <div className="recover-container">
        <h1>Nueva contraseña</h1>

        <form className="recover-form">
          <div className="recover-field">
            <label htmlFor="newpass">Nueva contraseña</label>
            <input
              type="password"
              placeholder="Ingrese su nueva contraseña"
              name="newpass"
              id="newpass"
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>

          <div className="recover-field">
            <label htmlFor="newpassrep">Repetir contraseña</label>
            <input
              type="password"
              placeholder="Repita su nueva contraseña"
              name="newpassrep"
              id="newpassrep"
              onChange={(e) => setNewPassRep(e.target.value)}
            />
          </div>

          <section className="recover-actions">
            <button
              className="recover-button recover-button--submit"
              type="submit"
              disabled={!newPass || !newPassRep}
              onClick={actualizarContrasena}
            >
              Actualizar contraseña
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

export default NuevaContrasenia;
