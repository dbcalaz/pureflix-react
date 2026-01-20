function Registro({ setVista }) {
  return (
    <>
      <div className="register-header">
        <h1>Registrarse</h1>
      </div>

      <form className="register-form">
        <div className="register-layout">

          {/* Datos de contacto */}
          <section className="register-contact">
            <article className="register-field">
              <label htmlFor="email">E-mail</label>
              <div className="register-input-group">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Ingrese email"
                />
                <p className="register-error"></p>
              </div>
            </article>

            <article className="register-field">
              <label htmlFor="nombreDeUsuario">Nombre de usuario</label>
              <div className="register-input-group">
                <input
                  type="text"
                  id="nombreDeUsuario"
                  name="nombreDeUsuario"
                  placeholder="Nombre de usuario"
                />
                <p className="register-error"></p>
              </div>
            </article>

            <article className="register-field">
              <label htmlFor="contrasenia">Contraseña</label>
              <div className="register-input-group">
                <input
                  type="password"
                  id="contrasenia"
                  name="contrasenia"
                  placeholder="Contraseña"
                />
                <p className="register-error"></p>
              </div>
            </article>

            <article className="register-field">
              <label htmlFor="repetirContrasenia">Repetir contraseña</label>
              <div className="register-input-group">
                <input
                  type="password"
                  id="repetirContrasenia"
                  name="repetirContrasenia"
                  placeholder="Repetir contraseña"
                />
                <p className="register-error"></p>
              </div>
            </article>
          </section>

          {/* Método de pago */}
          <section className="register-payment">
            <p className="register-section-title">Método de pago</p>

            <article className="register-payment-option">
              <label>
                <input type="radio" name="metodoPago" value="tarjeta" />
                Tarjeta de crédito
              </label>

              <div className="register-card-data">
                <input type="number" placeholder="Número de tarjeta" />
                <input type="number" placeholder="XXX" />
              </div>

              <div className="register-input-group">
                <p className="register-error"></p>
                <p className="register-error"></p>
              </div>
            </article>

            <article className="register-payment-option">
              <label>
                <input type="radio" name="metodoPago" value="cupon" />
                Cupón de pago
              </label>

              <div className="register-checkbox-group">
                <label><input type="checkbox" /> Pago fácil</label>
                <label><input type="checkbox" /> RapiPago</label>
              </div>
            </article>

            <article className="register-payment-option">
              <label>
                <input type="radio" name="metodoPago" value="transferencia" />
                Transferencia bancaria
              </label>
              <p className="register-cbu">CBU: 0000003100055994120766</p>
            </article>

            <p className="register-error"></p>

            <div className="register-actions">
              <button
                className="register-button register-button--confirm"
                type="submit"
                disabled
              >
                Confirmar
              </button>

              <button
                className="register-button register-button--cancel"
                type="button"
                onClick={() => setVista("login")}
              >
                Cancelar
              </button>
            </div>
          </section>

        </div>
      </form>
    </>
  );
}

export default Registro;
