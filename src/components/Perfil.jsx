import ImagenGenerica from "./ImagenGenerica";

function Perfil({ setVista }) {
  return (
    <>
      <div className="perfil">
        <form className="perfil__form">
          {/* Columna izquierda */}
          <section className="perfil__columna perfil__columna--izquierda">
            <ImagenGenerica
              imagen="FotoPerfil"
              className="perfil__foto"
              alt="fotoPerfil"
            />
            <p className="perfil__usuario" id="nombreDeUsuario">
              Nombre de usuario
            </p>
            <button
              type="button"
              className="perfil__logout"
              onClick={(e) => {
                setVista("login");
              }}
            >
              Cerrar sesión
            </button>
          </section>

          {/* Columna central */}
          <section className="perfil__columna perfil__columna--central">
            <article className="perfil__campo">
              <label>Email</label>
              <p className="perfil__email"></p>
            </article>

            <article className="perfil__campo">
              <label>Contraseña</label>
              <input type="password" value="1" disabled />
            </article>

            <article className="perfil__campo">
              <label>Nueva contraseña</label>
              <input type="password" placeholder="Ingrese nueva contraseña" />
            </article>

            <article className="perfil__campo">
              <label>Repetir contraseña</label>
              <input type="password" placeholder="Ingrese nueva contraseña" />
            </article>

            <div className="perfil__error">
              <p className="perfil__error-text"></p>
            </div>
          </section>

          {/* Columna derecha */}
          <section className="perfil__columna perfil__columna--derecha">
            <p className="perfil__titulo">Método de pago</p>

            <article className="perfil__pago">
              <label>
                <input type="radio" name="metodo-pago" />
                Tarjeta de crédito
              </label>

              <div className="perfil__tarjeta">
                <input type="number" placeholder="Número de tarjeta" />
                <input type="number" placeholder="XXX" />
              </div>

              <div className="perfil__error">
                <p className="perfil__error-text"></p>
              </div>
            </article>

            <article className="perfil__pago">
              <label>
                <input type="radio" name="metodo-pago" />
                Cupón de pago
              </label>

              <div className="perfil__checkbox">
                <label>
                  <input type="checkbox" /> Pago fácil
                </label>
                <label>
                  <input type="checkbox" /> RapiPago
                </label>
              </div>
            </article>

            <article className="perfil__pago">
              <label>
                <input type="radio" name="metodo-pago" />
                Transferencia bancaria
              </label>
              <p className="perfil__cbu">CBU: 2183909411100018971375</p>
            </article>

            <div className="perfil__acciones">
              <button
                type="submit"
                className="perfil__btn perfil__btn--guardar"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                className="perfil__btn perfil__btn--cancelar"
              >
                Cancelar suscripción
              </button>
            </div>
          </section>
        </form>
      </div>

      {/* Listas */}
      <section className="perfil__listas">
        <h2>Mi lista</h2>
        <div className="perfil__carrusel"></div>
      </section>

      <section className="perfil__listas">
        <h2>Próximos lanzamientos</h2>
        <div className="perfil__carrusel"></div>
      </section>
    </>
  );
}

export default Perfil;
