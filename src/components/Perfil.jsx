import ImagenGenerica from "./ImagenGenerica";
import { useState, useEffect } from "react";

function Perfil({ setVista, setMostrarModalCancelarSuscripcion, usuario }) {
  const [datos, setDatos] = useState();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setVista("login");
    }
  }, []);

  useEffect(() => {
    //obtenerDatosUsuario();
    console.log("Usuario en perfil:", usuario);
  }, []);

  return (
    <>
      <div className="perfil">
        <form className="perfil__form">
          <div className="perfil__contenido">
            {/* Columna izquierda */}
            <section className="perfil__columna perfil__columna--izquierda">
              <div>
                <ImagenGenerica
                  imagen="porDefault"
                  className="perfil__foto--perfil"
                  alt="fotoPerfil"
                />
                <ImagenGenerica imagen="edit" className="perfil__foto--edit" />
              </div>
              <p className="perfil__usuario" id="nombreDeUsuario">
                {usuario?.nombre_usuario}
              </p>
              <button
                type="button"
                className="perfil__logout"
                onClick={() => {
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
                <p className="perfil__email">{usuario?.email}</p>
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
                <div className="perfil__pago--opcion">
                  <input type="radio" name="metodo-pago" />
                  <label>Tarjeta de crédito</label>
                </div>
              </article>

              <article className="perfil__pago">
                <div className="perfil__pago--opcion">
                  <input type="radio" name="metodo-pago" />
                  <label>Cupón de pago</label>
                </div>

                <div className="perfil__checkbox">
                  <div className="perfil__pago--opcion">
                    <input type="checkbox" />
                    <label>Pago fácil</label>
                  </div>
                  <div className="perfil__pago--opcion">
                    <input type="checkbox" />
                    <label>RapiPago</label>
                  </div>
                </div>
              </article>

              <article className="perfil__pago">
                <div className="perfil__pago--opcion">
                  <input type="radio" name="metodo-pago" />
                  <label>Transferencia bancaria</label>
                </div>
                <p className="perfil__cbu">CBU: 2183909411100018971375</p>
              </article>
            </section>
          </div>

          <div className="perfil__acciones">
            <button type="submit" className="perfil__btn perfil__btn--guardar">
              Guardar cambios
            </button>
            <button
              type="button"
              className="perfil__btn perfil__btn--cancelar"
              onClick={() => setMostrarModalCancelarSuscripcion(true)}
            >
              Cancelar suscripción
            </button>
          </div>
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
