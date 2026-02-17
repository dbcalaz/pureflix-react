import { useState, useEffect } from "react";
import FetchPut from "../components/FetchPut";
import ImagenExterna from "./ImagenExterna";
const servidor = import.meta.env.VITE_SERVER;
const puerto = import.meta.env.VITE_PORT;

function AdministrarCuenta({ usuario, volver }) {
  const [newPass, setNewPass] = useState("");
  const [newPassRep, setNewPassRep] = useState("");

  const [metodoPagoGuardado, setMetodoPagoGuardado] = useState(null);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);

  const [mensajeOk, setMensajeOk] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [datosUsuario, setDatosUsuario] = useState(null);

  const passwordValida = newPass.length > 0 && newPass === newPassRep;
  const metodoPagoCambiado = metodoPagoGuardado !== metodoPagoSeleccionado;
  const hayCambios = passwordValida || metodoPagoCambiado;

  useEffect(() => {
    const getDatosUsuario = async () => {
      try {
        const res = await fetch(
          `http://${servidor}:${puerto}/getDatosUsuario?token=${usuario.token}`,
        );

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setDatosUsuario(data);

        const metodoPagoBack = Number(data.metodo_pago);

        let metodo = null;
        switch (metodoPagoBack) {
          case 1:
            metodo = "tarjeta";
            break;
          case 2:
            metodo = "transferencia";
            break;
          case 3:
            metodo = "pago_facil";
            break;
          case 4:
            metodo = "rapipago";
            break;
          default:
            metodo = null;
        }

        setMetodoPagoGuardado(metodo);
        setMetodoPagoSeleccionado(metodo);
      } catch (e) {
        console.error(e);
        navigate("/login");
      }
    };

    getDatosUsuario();
  }, [usuario?.token]);

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
        <button className="admin-cuenta__back" onClick={volver}>
          <ImagenExterna nombreImagen="arrowback.svg" />
        </button>
        <h1 className="admin-cuenta__title">Administrar cuenta</h1>
      </header>

      <form className="admin-cuenta__form" onSubmit={updateDatos}>
        <div className="admin-cuenta__grid">
          <section className="admin-cuenta__section">
            <h2 className="admin-cuenta__section-title">Cambiar contraseña</h2>

            <div className="admin-cuenta__field">
              <label htmlFor="newpass">Nueva contraseña</label>
              <input
                type="password"
                id="newpass"
                placeholder="Ingrese nueva contraseña"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>

            <div className="admin-cuenta__field">
              <label htmlFor="newpass_rep">Repetir contraseña</label>
              <input
                type="password"
                id="newpass_rep"
                placeholder="Repita nueva contraseña"
                value={newPassRep}
                onChange={(e) => setNewPassRep(e.target.value)}
              />
            </div>

            {mensajeError && (
              <div className="admin-cuenta__message admin-cuenta__message--error">
                {mensajeError}
              </div>
            )}
          </section>

          <section className="admin-cuenta__section">
            <h2 className="admin-cuenta__section-title">Método de pago</h2>
            <div className="admin-cuenta__payment-group">
              <label className="admin-cuenta__payment-option">
                <input
                  type="radio"
                  name="metodo-pago"
                  checked={metodoPagoSeleccionado === "tarjeta"}
                  onChange={() => setMetodoPagoSeleccionado("tarjeta")}
                />
                Tarjeta de crédito
              </label>

              <label className="admin-cuenta__payment-option">
                <input
                  type="radio"
                  name="metodo-pago"
                  checked={
                    metodoPagoSeleccionado === "pago_facil" ||
                    metodoPagoSeleccionado === "rapipago"
                  }
                  readOnly
                />
                Cupón de pago
              </label>

              <div className="admin-cuenta__payment-block">
                <label className="admin-cuenta__payment-option">
                  <input
                    type="checkbox"
                    checked={metodoPagoSeleccionado === "pago_facil"}
                    onChange={() => setMetodoPagoSeleccionado("pago_facil")}
                  />
                  Pago Fácil
                </label>

                <label className="admin-cuenta__payment-option">
                  <input
                    type="checkbox"
                    checked={metodoPagoSeleccionado === "rapipago"}
                    onChange={() => setMetodoPagoSeleccionado("rapipago")}
                  />
                  RapiPago
                </label>
              </div>

              <label className="admin-cuenta__payment-option">
                <input
                  type="radio"
                  name="metodo-pago"
                  checked={metodoPagoSeleccionado === "transferencia"}
                  onChange={() => setMetodoPagoSeleccionado("transferencia")}
                />
                Transferencia bancaria
              </label>

              <p className="admin-cuenta__cbu">CBU: 2183909411100018971375</p>
            </div>
          </section>
        </div>

        <div className="admin-cuenta__actions">
          <button
            type="submit"
            className="admin-cuenta__btn admin-cuenta__btn--primary"
            disabled={!hayCambios}
          >
            Guardar cambios
          </button>

          <button
            type="button"
            className="admin-cuenta__btn admin-cuenta__btn--danger"
          >
            Cancelar suscripción
          </button>
        </div>

        {mensajeOk && (
          <div className="admin-cuenta__message admin-cuenta__message--success">
            {mensajeOk}
          </div>
        )}
      </form>
    </div>
  );
}

export default AdministrarCuenta;
