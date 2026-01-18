function Recuperar() {
  return (
    <>
      <div>
        <form>
          <h1>Recuperar contraseña</h1>
          <div classNameName="label_input">
            <label htmlFor="gmail"> E-mail </label>
            <input
              type="email"
              placeholder="Ingrese email"
              //required
              name="gmail"
              id="gmail"
            />
          </div>

          <div className="label_input">
            <label htmlFor="usuario"> Usuario </label>
            <input
              type="text"
              placeholder="Ingrese nombre de usuario"
              //required
              name="user"
              id="usuario"
            />
          </div>

          <section className="botones">
            <button className="boton-confirmar" type="submit" disabled>
              Enviar email
            </button>
            <button onClick={() => setVista("login")}>Cancelar</button>
          </section>
        </form>
      </div>
    </>
  );
}

export default Recuperar;
