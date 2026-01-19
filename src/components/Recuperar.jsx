function Recuperar() {
  return (
    <>
      <div className="container_recuperar">
        <h1>Recuperar contraseña</h1>
        <form className="form_recuperar">
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

          <section className="section_btn_recuperar">
            <button className="btn enviar" type="submit">
              Enviar email
            </button>
            <button className="btn cancelar" onClick={() => setVista("login")}>Cancelar</button>
          </section>
        </form>
      </div>
    </>
  );
}

export default Recuperar;
