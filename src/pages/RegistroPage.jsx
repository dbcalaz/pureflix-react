import FetchPost from "../components/FetchPost";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegistroPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [camposCompletos, setCamposCompletos] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [tipoPago, setTipoPago] = useState("");
  const [cuponPago, setCuponPago] = useState("");
  const [mensajeOk, setMensajeOk] = useState("");

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

    if (pass && pass2 && pass !== pass2) {
      setMensajeError("Las contraseñas no coinciden");
    } else {
      setMensajeError("");
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

      setEmail("");
      setUsuario("");
      setPass("");
      setPass2("");
      setMetodoPago("");
      setMensajeOk(
        "Usuario registrado con éxito. Verificar email para activar cuenta.",
      );
    } catch (e) {
      console.error(e);
      setMensajeError("Error de conexión");
    }
  }

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__header">
          <h1 className="register__title">Crear cuenta</h1>
        </div>

        <form className="register__form">
          <div className="register__layout">
            {/*contacto*/}
            <section className="register__section register__section--contact">
              <article className="register__field">
                <label htmlFor="email" className="register__label">
                  E-mail
                </label>

                <div className="register__input-group">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Ingrese email"
                    className="register__input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </article>

              <article className="register__field">
                <label htmlFor="nombreDeUsuario" className="register__label">
                  Nombre de usuario
                </label>

                <div className="register__input-group">
                  <input
                    type="text"
                    id="nombreDeUsuario"
                    name="nombreDeUsuario"
                    placeholder="Nombre de usuario"
                    className="register__input"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </div>
              </article>

              <article className="register__field">
                <label htmlFor="contrasenia" className="register__label">
                  Contraseña
                </label>

                <div className="register__input-group">
                  <input
                    type="password"
                    id="contrasenia"
                    name="contrasenia"
                    placeholder="Contraseña"
                    className="register__input"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
              </article>

              <article className="register__field">
                <label htmlFor="repetirContrasenia" className="register__label">
                  Repetir contraseña
                </label>

                <div className="register__input-group">
                  <input
                    type="password"
                    id="repetirContrasenia"
                    name="repetirContrasenia"
                    placeholder="Repetir contraseña"
                    className="register__input"
                    value={pass2}
                    onChange={(e) => setPass2(e.target.value)}
                  />
                </div>
              </article>
            </section>

            {/*METODO DE PAGO*/}
            <section className="register__section register__section--payment">
              <h2 className="register__section-title">Método de pago</h2>

              <div className="register__payment-options">
                <label
                  className={`register__payment-card ${tipoPago === "tarjeta" ? "register__payment-card--active" : ""}`}
                >
                  <input
                    type="radio"
                    name="metodoPago"
                    value="tarjeta"
                    checked={tipoPago === "tarjeta"}
                    onChange={(e) => {
                      setTipoPago(e.target.value);
                      setCuponPago("");
                    }}
                  />
                  <span> 💳 Tarjeta de crédito</span>
                </label>

                <div
                  className={`register__payment-card ${tipoPago === "cupon" ? "register__payment-card--active" : ""}`}
                >
                  <label className="register__payment-main">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="cupon"
                      checked={tipoPago === "cupon"}
                      onChange={(e) => {
                        setTipoPago(e.target.value);
                        setCuponPago("");
                      }}
                    />
                    <span>🎟 Cupón de pago</span>
                  </label>

                  <div className="register__checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        disabled={tipoPago !== "cupon"}
                        checked={cuponPago === "pago_facil"}
                        onChange={() => setCuponPago("pago_facil")}
                      />
                      Pago Fácil
                    </label>

                    <label>
                      <input
                        type="checkbox"
                        disabled={tipoPago !== "cupon"}
                        checked={cuponPago === "rapipago"}
                        onChange={() => setCuponPago("rapipago")}
                      />
                      RapiPago
                    </label>
                  </div>
                </div>

                <div
                  className={`register__payment-card ${tipoPago === "transferencia" ? "register__payment-card--active" : ""}`}
                >
                  <label className="register__payment-main">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="transferencia"
                      checked={tipoPago === "transferencia"}
                      onChange={(e) => {
                        setTipoPago(e.target.value);
                        setCuponPago("");
                      }}
                    />
                    <span>🏦 Transferencia bancaria</span>
                  </label>

                  <p className="register__cbu">CBU: 0000003100055994120766</p>
                </div>
              </div>

              {mensajeOk && <p className="register__ok">{mensajeOk}</p>}
              {mensajeError && (
                <p className="register__error">{mensajeError}</p>
              )}
            </section>
          </div>

          <div className="register__actions">
            <button
              type="button"
              className="register__button register__button--confirm"
              disabled={!camposCompletos}
              onClick={registrarUsuario}
            >
              Confirmar
            </button>

            <button
              type="button"
              className="register__button register__button--cancel"
              onClick={() => navigate("/login")}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroPage;
