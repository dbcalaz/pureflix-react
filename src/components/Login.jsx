import ImagenGenerica from "./ImagenGenerica";

function Login({ setVista }) {
  return (
    <>
      <div className="login-container">
        <ImagenGenerica
          imagen="pureflix"
          alt="Pureflix"
          className="logo-login"
        />

        <div>
          <form
            className="formulario"
            onSubmit={(e) => {
              e.preventDefault();
              setVista("home");
            }}
          >
            <div className="label_input">
              <label className="labels" htmlFor="usuario">
                Nombre de usuario
              </label>
              <input
                className="inputs"
                type="text"
                placeholder="Nombre de usuario"
                name="user"
                id="usuario"
                //required
              />
            </div>
            <div className="label_input">
              <label className="labels" htmlFor="contrasenia">
                Contraseña
              </label>
              <input
                className="inputs"
                type="password"
                placeholder="Contraseña"
                name="password"
                id="contrasenia"
                //required
              />
            </div>
            <button className="boton-login" type="submit">
              Iniciar sesión
            </button>
          </form>

          <section>
            <button onClick={() => setVista("recuperar")}>
              ¿Olvidaste tu contraseña?
            </button>
            <button onClick={() => setVista("registro")}>Registrarse</button>
          </section>
        </div>
      </div>
    </>
  );
}

export default Login;
