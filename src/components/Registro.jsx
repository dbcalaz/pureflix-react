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
      console.log("Usuario registrado con éxito. Verificar email para activar cuenta.");
    } catch (e) {
      console.error(e);
      setMensajeError("Error de conexión");
    }
  }

  return (
    <>
      <div className="register-container">
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
                <input
                  type="radio"
                  name="metodoPago"
                  value="tarjeta"
                  id="tarjeta"
                  onChange={(e) => {
                    setTipoPago(e.target.value);
                    setCuponPago("");
                  }}
                />
                <label htmlFor="tarjeta">Tarjeta de crédito</label>
              </article>

              <article className="register-payment-suboption">
                <div className="register-payment-label-input">
                  <input
                    type="radio"
                    name="metodoPago"
                    value="cupon"
                    id="cupon_pago"
                    onChange={(e) => {
                      setTipoPago(e.target.value);
                      setCuponPago("");
                    }}
                  />
                  <label htmlFor="cupon_pago">Cupón de pago</label>
                </div>

                <div className="register-checkbox-group">
                  <label htmlFor="pago_facil">
                    <input
                      type="checkbox"
                      id="pago_facil"
                      disabled={tipoPago !== "cupon"}
                      checked={cuponPago === "pago_facil"}
                      onChange={() => setCuponPago("pago_facil")}
                    />{" "}
                    Pago fácil
                  </label>
                  <label htmlFor="rapi_pago">
                    <input
                      type="checkbox"
                      id="rapi_pago"
                      disabled={tipoPago !== "cupon"}
                      checked={cuponPago === "rapipago"}
                      onChange={() => setCuponPago("rapipago")}
                    />{" "}
                    RapiPago
                  </label>
                </div>
              </article>

              <article className="register-payment-suboption">
                <div className="register-payment-label-input">
                  <input
                    type="radio"
                    name="metodoPago"
                    value="transferencia"
                    id="tranferencia"
                    onChange={(e) => {
                      setTipoPago(e.target.value);
                      setCuponPago("");
                    }}
                  />
                  <label htmlFor="tranferencia">Transferencia bancaria</label>
                </div>
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
      </div>
    </>
  );
}

export default Registro;
