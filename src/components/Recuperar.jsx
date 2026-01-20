function Recuperar({ setVista }) {
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
            />
          </div>

          <div className="recover-field">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              placeholder="Ingrese nombre de usuario"
              name="user"
              id="usuario"
            />
          </div>

          <section className="recover-actions">
            <button
              className="recover-button recover-button--submit"
              type="submit"
            >
              Enviar email
            </button>

            <button
              className="recover-button recover-button--cancel"
              onClick={() => setVista("login")}
              type="button"
            >
              Cancelar
            </button>
          </section>
        </form>
      </div>
    </>
  );
}

export default Recuperar;
