import ImagenGenerica from "./ImagenGenerica";

function Login({ setVista }) {
  return (
    <>
      <div className="login-container">
        <ImagenGenerica
          imagen="pureflix"
          alt="Pureflix"
          className="login-logo"
        />

        <div>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              setVista("home");
            }}
          >
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
              />
            </div>

            <button className="login-submit" type="submit">
              Iniciar sesión
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
