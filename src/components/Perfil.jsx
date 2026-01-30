import ImagenGenerica from "./ImagenGenerica";
import { useState, useEffect } from "react";

function Perfil({ setVista, setMostrarModalCancelarSuscripcion, usuario }) {
  const [newPass, setNewPass] = useState("");
  const [newPassRep, setNewPassRep] = useState("");
  const [metodoPagoActual, setMetodoPagoActual] = useState(null);

  useEffect(() => {
    if (!usuario) return;

    switch (usuario.metodo_pago) {
      case 1:
        setMetodoPagoActual("tarjeta");
        break;
      case 2:
        setMetodoPagoActual("transferencia");
        break;
      case 3:
        setMetodoPagoActual("pago_facil");
        break;
      case 4:
        setMetodoPagoActual("rapipago");
        break;
      default:
        setMetodoPagoActual(null);
    }
  }, [usuario]);

  useEffect(() => {
    const userToken = usuario.token;
    if (!userToken) {
      setVista("login");
    }
  }, []);

  useEffect(() => {
    console.log("Usuario en perfil:", usuario);
  }, []);

  /*function updateSoloContrasena(){
  }*/

  /*function updateSoloMetodoDePago() {
  }*/

  /*function updateContrasenaMetodoDePago() {
  }*/

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
                <label htmlFor="newpass">Nueva contraseña</label>
                <input
                  type="password"
                  placeholder="Ingrese nueva contraseña"
                  id="newpass"
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </article>
              <article className="perfil__campo">
                <label htmlFor="newpass_rep">Repetir contraseña</label>
                <input
                  type="password"
                  placeholder="Repita nueva contraseña"
                  id="newpass_rep"
                  onChange={(e) => setNewPassRep(e.target.value)}
                />
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
                  <input
                    type="radio"
                    name="metodo-pago"
                    id="credit_card"
                    checked={metodoPagoActual === "tarjeta"}
                    onChange={() => setMetodoPagoActual("tarjeta")}
                  />
                  <label htmlFor="credit_card">Tarjeta de crédito</label>
                </div>
              </article>

              <article className="perfil__pago">
                <div className="perfil__pago--opcion">
                  <input
                    type="radio"
                    name="metodo-pago"
                    id="cupon_pago"
                    onChange={(e) => setTipoPago(e.target.value)}
                  />
                  <label htmlFor="cupon_pago">Cupón de pago</label>
                </div>

                <div className="perfil__checkbox">
                  <div className="perfil__pago--opcion">
                    <input
                      type="checkbox"
                      id="pago_facil"
                      checked={metodoPagoActual === "pago_facil"}
                      onChange={() => setMetodoPagoActual("pago_facil")}
                    />
                    <label htmlFor="pago_facil">Pago fácil</label>
                  </div>
                  <div className="perfil__pago--opcion">
                    <input
                      type="checkbox"
                      id="rapipago"
                      checked={metodoPagoActual === "rapipago"}
                      onChange={() => setMetodoPagoActual("rapipago")}
                    />
                    <label htmlFor="rapipago">RapiPago</label>
                  </div>
                </div>
              </article>

              <article className="perfil__pago">
                <div className="perfil__pago--opcion">
                  <input
                    type="radio"
                    name="metodo-pago"
                    id="transferencia_bancaria"
                    checked={metodoPagoActual === "transferencia"}
                    onChange={() => setMetodoPagoActual("transferencia")}
                  />
                  <label htmlFor="transferencia_bancaria">
                    Transferencia bancaria
                  </label>
                </div>
                <p className="perfil__cbu">CBU: 2183909411100018971375</p>
              </article>
            </section>
          </div>

          <div className="perfil__acciones">
            <button
              type="submit"
              className="perfil__btn perfil__btn--guardar"
              disabled={!newPass || !newPassRep}
            >
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
