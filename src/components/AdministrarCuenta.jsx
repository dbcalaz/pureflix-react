import { useState } from "react";
import FetchPut from "../components/FetchPut";

function AdministrarCuenta({ usuario, volver }) {
  const [newPass, setNewPass] = useState("");
  const [newPassRep, setNewPassRep] = useState("");

  const [metodoPagoGuardado, setMetodoPagoGuardado] = useState(null);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);

  const [mensajeOk, setMensajeOk] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const passwordValida = newPass.length > 0 && newPass === newPassRep;
  const metodoPagoCambiado = metodoPagoGuardado !== metodoPagoSeleccionado;
  const hayCambios = passwordValida || metodoPagoCambiado;

  async function updateDatos(e) {
    e.preventDefault();

    setMensajeOk("");
    setMensajeError("");

    const datosActualizados = {
      new_pass: newPass,
      metodo_pago: metodoPagoSeleccionado,
      token: usuario.token,
      cambio_pass: passwordValida,
    };

    try {
      const res = await FetchPut("actualizarUsuario", datosActualizados);

      if (!res.ok) {
        const err = await res.json();
        setMensajeError(err.mensaje || "Error al actualizar datos");
        return;
      }

      const data = await res.json();
      setMensajeOk(data.mensaje || "Datos actualizados con éxito");

      setNewPass("");
      setNewPassRep("");
      setMetodoPagoGuardado(metodoPagoSeleccionado);
    } catch (e) {
      console.error(e);
      setMensajeError("Error de conexión.");
    }
  }

  return (
    <div className="admin-cuenta">
      <header className="admin-cuenta__header">
        <button onClick={volver}>←</button>
        <h1>Administrar cuenta</h1>
      </header>

      <form className="perfil__form">
        <div className="perfil__contenido">
          <div className="perfil__columna perfil__columna--medio">
            <div className="perfil__datos">
              <section className="perfil__columna perfil__columna--central">
                {/*<article className="perfil__campo">
                  <label>Email</label>
                  <p className="perfil__email">{datosUsuario?.email}</p>
                </article>*/}

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
                  <p className="perfil__error-text">{mensajeError}</p>
                </div>
              </section>

              <section className="perfil__columna perfil__columna--derecha">
                <p className="perfil__titulo">Método de pago</p>

                <article className="perfil__pago">
                  <div className="perfil__pago--opcion">
                    <input
                      type="radio"
                      name="metodo-pago"
                      id="credit_card"
                      checked={metodoPagoSeleccionado === "tarjeta"}
                      onChange={() => setMetodoPagoSeleccionado("tarjeta")}
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
                      checked={
                        metodoPagoSeleccionado === "pago_facil" ||
                        metodoPagoSeleccionado === "rapipago"
                      }
                      readOnly
                    />
                    <label htmlFor="cupon_pago">Cupón de pago</label>
                  </div>

                  <div className="perfil__checkbox">
                    <div className="perfil__pago--opcion">
                      <input
                        type="checkbox"
                        id="pago_facil"
                        checked={metodoPagoSeleccionado === "pago_facil"}
                        onChange={() => setMetodoPagoSeleccionado("pago_facil")}
                      />
                      <label htmlFor="pago_facil">Pago fácil</label>
                    </div>
                    <div className="perfil__pago--opcion">
                      <input
                        type="checkbox"
                        id="rapipago"
                        checked={metodoPagoSeleccionado === "rapipago"}
                        onChange={() => setMetodoPagoSeleccionado("rapipago")}
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
                      checked={metodoPagoSeleccionado === "transferencia"}
                      onChange={() =>
                        setMetodoPagoSeleccionado("transferencia")
                      }
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
                disabled={!hayCambios}
                onClick={updateDatos}
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
          </div>
        </div>
        {mensajeOk && <p className="perfil__mensaje">{mensajeOk}</p>}
      </form>
    </div>
  );
}

export default AdministrarCuenta;
