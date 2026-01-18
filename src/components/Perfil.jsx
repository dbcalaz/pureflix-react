import ImagenGenerica from "./ImagenGenerica";

function Perfil() {
  return (
    <>
      <div className="contenedor-principal">
        <form
          className="formulario-contenedor"
        >
          <section className="columna columna-izquierda">
            <ImagenGenerica imagen={"FotoPerfil"} />
            <p className="perfil-usuario" id="nombreDeUsuario">
              Nombre de usuario
            </p>
            <button onClick={() => setVista("login")}>Cerrar sesión</button>
          </section>

          <section className="columna columna-central">
            <article className="sección-formulario">
              <label htmlFor="email" id="emailDeUsuario">
                Email
              </label>
              <p className="e-mail"></p>
            </article>

            <article className="sección-formulario">
              <label htmlFor="contrasenia">Contraseña</label>
              <input
                id="contrasenia"
                name="contrasenia"
                type="password"
                value="1"
                disabled
              />
            </article>

            <article className="sección-formulario">
              <label htmlFor="nuevaContrasenia">Nueva contraseña</label>
              <input
                id="nuevaContrasenia"
                name="nueva-contrasenia"
                type="password"
                placeholder="Ingrese nueva contraseña"
                //required
              />
            </article>

            <article className="sección-formulario">
              <label htmlFor="repetirContrasenia">Repetir contraseña</label>
              <input
                id="repetirContrasenia"
                name="repetir-contrasenia"
                type="password"
                placeholder="Ingrese nueva contraseña"
                //required
              />
            </article>

            <div className="input-con-error">
              <p id="errorContrasenia" className="error"></p>
            </div>
          </section>

          <section className="columna columna-derecha">
            <p className="seccion-titulo">Método de pago</p>

            <article className="metodo-pago">
              <label>
                <input type="radio" name="metodo-pago" id="tarjeta-credito" />
                Tarjeta de crédito
              </label>
              <div className="datos-tarjeta">
                <input
                  id="numeroTarjeta"
                  type="number"
                  placeholder="Número de tarjeta"
                  className="datos-tarjeta"
                />
                <input
                  id="claveTarjeta"
                  type="number"
                  placeholder="XXX"
                  className="datos-tarjeta"
                />
              </div>
              <div className="input-con-error">
                <p id="errorTarjeta" className="error"></p>
                <p id="errorClave" className="error"></p>
              </div>
            </article>

            <article className="metodo-pago">
              <label>
                <input type="radio" name="metodo-pago" id="cuponPago" />
                Cupón de pago
              </label>
              <div className="opcion-checkbox">
                <label>
                  <input type="checkbox" value="pagoFacil" /> Pago fácil
                </label>
                <label>
                  <input type="checkbox" value="rapiPago" /> RapiPago
                </label>
              </div>
              <div className="input-con-error">
                <p id="errorCupon" className="error"></p>
              </div>
            </article>

            <article className="metodo-pago">
              <label>
                <input
                  type="radio"
                  name="metodo-pago"
                  id="transferenciaBancaria"
                />
                Transferencia bancaria
              </label>
              <p className="cbu">CBU: 2183909411100018971375</p>
            </article>

            <section className="botones">
              <button className="boton boton-guardar" type="submit">
                Guardar cambios
              </button>
              <a href="./index.html" className="boton boton-cancelar">
                Cancelar suscripción
              </a>
            </section>
          </section>
        </form>
      </div>

      <section className="info_favorito_contenido">
        <h2>Mi lista</h2>
        <div
          className="contenedor_info_carrusel"
          id="contenedorFavoritos"
        ></div>
      </section>

      <section className="info_favorito_contenido">
        <h2>Próximos Lanzamientos</h2>
        <div
          className="contenedor_info_carrusel"
          id="contenedorProximosLanzamientos"
        ></div>
      </section>
    </>
  );
}

export default Perfil;
