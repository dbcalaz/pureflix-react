import { useState } from "react";
import ImagenGenerica from "./ImagenGenerica";
import FetchPost from "./FetchPost";

function Login({ setVista , setUsuario}) {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [estaCargando, setEstaCargando] = useState(false);

  const intentarIniciarSesion = async (e) => {
    e.preventDefault();
    setMensajeError("");

    if (!nombreUsuario || !password) {
      setMensajeError("Debe completar todos los campos");
      return;
    }

    setEstaCargando(true);

    try {
      const res = await FetchPost("login", {
        nombre_usuario: nombreUsuario,
        pass: password,
      });

      if (!res.ok) {
        setMensajeError("Usuario y/o contraseña incorrecta");
        setEstaCargando(false);
        return;
      }

      const data = await res.json();
      setUsuario(data);
      setVista("home");
    } catch (error) {
      setMensajeError("Error de conexión con el servidor");
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <ImagenGenerica
          imagen="pureflix"
          alt="Pureflix"
          className="login-logo"
        />

        <div>
          <form className="login-form" onSubmit={intentarIniciarSesion}>
            <div className="login-field">
              <label className="login-label" htmlFor="usuario">
                Nombre de usuario
              </label>
              <input
                className="login-input"
                type="text"
                placeholder="Nombre de usuario"
                name="user"
                id="usuario"
                onChange={(e) => setNombreUsuario(e.target.value)}
              />
            </div>

            <div className="login-field">
              <label className="login-label" htmlFor="contrasenia">
                Contraseña
              </label>
              <input
                className="login-input"
                type="password"
                placeholder="Contraseña"
                name="password"
                id="contrasenia"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {mensajeError && (
              <div className="login-error-message">{mensajeError}</div>
            )}

            <button
              className="login-submit"
              type="submit"
              disabled={estaCargando}
            >
              {estaCargando ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <section className="login-secondary-actions">
            <button
              className="login-secondary-button"
              onClick={() => setVista("recuperar")}
            >
              ¿Olvidaste tu contraseña?
            </button>
            <button
              className="login-secondary-button"
              onClick={() => setVista("registro")}
            >
              Registrarse
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
