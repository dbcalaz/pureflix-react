import ImagenGenerica from "./ImagenGenerica";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FetchPut from "../components/FetchPut";

function Perfil({ setMostrarModalCancelarSuscripcion, usuario }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [newPass, setNewPass] = useState("");
  const [newPassRep, setNewPassRep] = useState("");

  const [metodoPagoGuardado, setMetodoPagoGuardado] = useState(null);
  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(null);

  const [mensajeOk, setMensajeOk] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    if (!usuario?.token) {
      navigate("/login");
      return;
    }

    const getDatosUsuario = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:9000/getDatosUsuario?token=${usuario.token}`,
        );

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setDatosUsuario(data);
        console.log(data.metodo_pago, typeof data.metodo_pago);

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
  }, [usuario?.token, navigate]);

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
    <>
      <div className="perfil">
        <form className="perfil__form">
          <div className="perfil__contenido">
            {/* Columna izquierda */}
            <section className="perfil__columna perfil__columna--izquierda">
              <div className="perfil__foto">
                <ImagenGenerica
                  imagen="porDefault"
                  className="perfil__foto--perfil"
                  alt="fotoPerfil"
                />
                <ImagenGenerica
                  imagen="edit"
                  className="perfil__foto--edit"
                  onClick={() => editarFotoPerfil()}
                />
              </div>
              <p className="perfil__usuario">{datosUsuario?.nombre_usuario}</p>
              <button
                type="button"
                className="perfil__logout"
                onClick={() => {
                  document.cookie = "token=; Max-Age=0; path=/";
                  document.cookie = "nombre_usuario=; Max-Age=0; path=/";
                  document.cookie = "email=; Max-Age=0; path=/";
                  logout();
                  navigate("/login");
                }}
              >
                Cerrar sesión
              </button>
            </section>

            <div className="perfil__columna perfil__columna--medio">
              <div className="perfil__datos">
                {/* Columna central */}
                <section className="perfil__columna perfil__columna--central">
                  <article className="perfil__campo">
                    <label>Email</label>
                    <p className="perfil__email">{datosUsuario?.email}</p>
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
                    <p className="perfil__error-text">{mensajeError}</p>
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
                        checked={metodoPagoSeleccionado === "tarjeta"}
                        onChange={() => setMetodoPagoSeleccionado("tarjeta")}
                      />
                      <label htmlFor="credit_card">Tarjeta de crédito</label>
                    </div>
                  </article>

                  <article className="perfil__pago">
                    <div className="perfil__pago--opcion">
                      <input
                        type="checkbox"
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
                          onChange={() =>
                            setMetodoPagoSeleccionado("pago_facil")
                          }
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
