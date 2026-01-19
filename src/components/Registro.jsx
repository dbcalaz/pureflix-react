function Registro() {
  return (
    <>
      <div className="Registrarse">
        <h1>Registrarse</h1>
      </div>
      <form id="form">
        <div className="contenedor-general">
          <section className="FormularioContactoGlobal">
            <article className="FormularioContacto">
              <label htmlFor="email">E-mail</label>
              <div className="input-con-error">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Ingrese email"
                />
                <p id="errorEmail" className="error"></p>
              </div>
            </article>
            <article className="FormularioContacto">
              <label htmlFor="nombreDeUsuario">Nombre de usuario</label>
              <div className="input-con-error">
                <input
                  type="text"
                  id="nombreDeUsuario"
                  name="nombreDeUsuario"
                  placeholder="Nombre de usuario"
                />
                <p id="errorNombreDeUsuario" className="error"></p>
              </div>
            </article>
            <article className="FormularioContacto">
              <label htmlFor="contrasenia">Contraseña</label>
              <div className="input-con-error">
                <input
                  type="password"
                  id="contrasenia"
                  name="contrasenia"
                  placeholder="Contraseña"
                />
                <p id="errorContrasenia" className="error"></p>
              </div>
            </article>
            <article className="FormularioContacto">
              <label htmlFor="repetirContrasenia">Repetir contraseña</label>
              <div className="input-con-error">
                <input
                  type="password"
                  id="repetirContrasenia"
                  name="repetirContrasenia"
                  placeholder="Repetir contraseña"
                />
                <p id="errorRepetirContrasenia" className="error"></p>
              </div>
            </article>
          </section>

          <section className="MetodoPagoGlobal">
            <p className="seccion-titulo">Método de pago</p>

            <article className="metodo-pago">
              <label>
                <input
                  type="radio"
                  name="metodoPago"
                  value="tarjeta"
                  id="radioTarjeta"
                />
                Tarjeta de crédito
              </label>
              <div className="datos-tarjeta">
                <input
                  type="number"
                  name="numeroTarjeta"
                  className="datos-tarjeta"
                  id="numeroTarjeta"
                  placeholder="Número de tarjeta"
                />
                <input
                  type="number"
                  className="datos-tarjeta"
                  id="claveTarjeta"
                  name="Codigo"
                  placeholder="XXX"
                />
              </div>
              <div className="input-con-error">
                <p id="errorNumeroTarjeta" className="errorTarjeta"></p>
                <p id="errorClaveTarjeta" className="errorTarjeta"></p>
              </div>
            </article>

            <article className="metodo-pago">
              <label>
                <input
                  type="radio"
                  name="metodoPago"
                  value="cupon"
                  id="radioCupon"
                />
                Cupón de pago
              </label>
              <div className="opcion-checkbox">
                <label>
                  <input type="checkbox" id="pagoFacil" /> Pago fácil
                </label>
                <label>
                  <input type="checkbox" id="rapiPago" /> RapiPago
                </label>
              </div>
            </article>

            <article className="metodo-pago">
              <label>
                <input
                  type="radio"
                  name="metodoPago"
                  value="transferencia"
                  id="radioTransferencia"
                />
                Transferencia bancaria
              </label>
              <p className="cbu">CBU: 0000003100055994120766</p>
            </article>

            <div className="input-con-error">
              <p id="errorMetodoPago" className="error"></p>
            </div>
            <div className="botones">
              <button
                className="boton boton-guardar"
                type="submit"
                id="btnConfirmar"
                disabled
              >
                Confirmar
              </button>
              <button onClick={() => setVista("login")}>Cancelar</button>
            </div>
          </section>
        </div>
      </form>
    </>
  );
}

export default Registro;
