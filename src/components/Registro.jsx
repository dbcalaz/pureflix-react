import FetchPost from "./FetchPost";
import { useState, useEffect } from "react";

function Registro({ setVista }) {
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [camposCompletos, setCamposCompletos] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [cuponPago, setCuponPago] = useState("");

  useEffect(() => {
    if (tipoPago === "tarjeta") {
      setMetodoPago("tarjeta");
    } else if (tipoPago === "transferencia") {
      setMetodoPago("transferencia");
    } else if (tipoPago === "cupon" && cuponPago) {
      setMetodoPago(cuponPago);
    } else {
      setMetodoPago("");
    }
  }, [tipoPago, cuponPago]);

  useEffect(() => {
    if (email && usuario && pass && pass2 && pass === pass2 && metodoPago) {
      setCamposCompletos(true);
    } else {
      setCamposCompletos(false);
    }
  }, [email, usuario, pass, pass2, metodoPago]);

  async function registrarUsuario() {
    const datos = {
      email: email,
      nombre_usuario: usuario,
      pass: pass,
      metodo_pago: metodoPago,
    };

    try {
      const res = await FetchPost("registrarNuevoUsuario", datos);

      if (!res.ok) {
        const err = await res.json();
        setMensajeError(err.mensaje || "Error al registrar");
        console.error(err.mensaje);
        return;
      }

      setVista("login");
    } catch (e) {
      console.error(e);
      setMensajeError("Error de conexión");
    }
  }

  return (
    <>
      <div className="register-header">
        <h1>Registrarse</h1>
      </div>

      <div className="register-form">
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setUsuario(e.target.value)}
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
                  onChange={(e) => setPass(e.target.value)}
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
                  onChange={(e) => setPass2(e.target.value)}
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
                <input
                  type="radio"
                  name="metodoPago"
                  value="tarjeta"
                  onChange={(e) => {
                    setTipoPago(e.target.value);
                    setCuponPago("");
                  }}
                />
                Tarjeta de crédito
              </label>

              <div className="register-input-group">
                <p className="register-error"></p>
                <p className="register-error"></p>
              </div>
            </article>

            <article className="register-payment-option">
              <label>
                <input
                  type="radio"
                  name="metodoPago"
                  value="cupon"
                  onChange={(e) => {
                    setTipoPago(e.target.value);
                    setCuponPago("");
                  }}
                />
                Cupón de pago
              </label>

              <div className="register-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={cuponPago === "pago_facil"}
                    onChange={() => setCuponPago("pago_facil")}
                  />{" "}
                  Pago fácil
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={cuponPago === "rapipago"}
                    onChange={() => setCuponPago("rapipago")}
                  />{" "}
                  RapiPago
                </label>
              </div>
            </article>

            <article className="register-payment-option">
              <label>
                <input
                  type="radio"
                  name="metodoPago"
                  value="transferencia"
                  onChange={(e) => {
                    setTipoPago(e.target.value);
                    setCuponPago("");
                  }}
                />
                Transferencia bancaria
              </label>
              <p className="register-cbu">CBU: 0000003100055994120766</p>
            </article>

            <p className="register-error"></p>

            <div className="register-actions">
              <button
                className="register-button register-button--confirm"
                disabled={!camposCompletos}
                onClick={registrarUsuario}
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
      </div>
    </>
  );
}

export default Registro;
