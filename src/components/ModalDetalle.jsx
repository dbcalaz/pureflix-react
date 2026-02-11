import { useState, useEffect } from "react";
import ImagenExterna from "./ImagenExterna";
import FetchPost from "./FetchPost";

function ModalDetalle({ mostrar, setMostrar, user, favoritos, setFavoritos }) {
  const servidor = import.meta.env.VITE_SERVER;
  const puerto = import.meta.env.VITE_PORT;

  const [temporada, setTemporada] = useState("");
  const [capitulos, setCapitulos] = useState([]);
  const [capituloSeleccionado, setCapituloSeleccionado] = useState(null);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeOk, setMensajeOk] = useState("");
  const [esFavorito, setEsFavorito] = useState(false);
  const [cargandoFavorito, setCargandoFavorito] = useState(false);

  useEffect(() => {
    if (!mostrar?.id || !favoritos) return;

    const estaEnFavoritos = favoritos.some((f) => f.id === mostrar.id);

    setEsFavorito(estaEnFavoritos);
  }, [mostrar, favoritos]);

  async function marcarFavorito(idContenido) {
    if (cargandoFavorito) return;

    setCargandoFavorito(true);
    setMensajeOk("");
    setMensajeError("");

    const datos = {
      token: user.token,
      id_contenido: idContenido,
    };

    try {
      const res = await FetchPost("marcarFavorito", datos);

      if (!res.ok) {
        const err = await res.json();
        setMensajeError(err.mensaje || "Error al marcar favorito");
        return;
      }

      const data = await res.json();
      setMensajeOk(data.mensaje || "Se marcó como favorito correctamente");
      setEsFavorito(true);
      setFavoritos((prev) => [...prev, mostrar]);
    } catch (e) {
      setMensajeError("Error de conexión.");
    } finally {
      setCargandoFavorito(false);
    }
  }

  async function eliminarFavorito(idContenido) {
    if (cargandoFavorito) return;

    setCargandoFavorito(true);
    setMensajeOk("");
    setMensajeError("");

    let id_contenido = idContenido;
    console.log("id_contenido: " , id_contenido);
    let token = user.token;

    try {
      const url = `http://${servidor}:${puerto}/eliminarFavorito?id_contenido=${id_contenido}&token=${token}`;
      const res = await fetch(url, {
        method: "DELETE",
      });

      if (!res.ok) {
        const err = await res.json();
        setMensajeError(err.mensaje || "Error al desmarcar favorito");
        return;
      }

      const data = await res.json();
      setMensajeOk(data.mensaje || "Se desmarcó como favorito correctamente");
      setEsFavorito(false);
      setFavoritos((prev) => prev.filter((f) => f.id !== mostrar.id));
    } catch (e) {
      setMensajeError("Error de conexión.");
    } finally {
      setCargandoFavorito(false);
    }
  }

  return (
    <div className="modal-detalle">
      <div className="modal-detalle__overlay" onClick={() => setMostrar({})} />

      <div className="modal-detalle__contenido">
        <section className="modal-detalle__info">
          <div className="modal-detalle__layout">
            <div className="modal-detalle__video-bloque">
              <div className="modal-detalle__video">
                <iframe src={mostrar?.link_trailer} title="Trailer" />
              </div>
            </div>

            <div className="modal-detalle__descripcion">
              <div className="modal-detalle__fila modal-detalle__fila--titulo">
                <div className="modal-detalle__campo">
                  <h3>Título:</h3>
                  <p>{mostrar?.titulo}</p>
                </div>
                <div className="modal-detalle__campo modal-detalle__campo--heart">
                  <ImagenExterna
                    className={`modal-detalle__heart ${esFavorito ? "favorito-activo" : ""}`}
                    nombreImagen="fav.svg"
                    onClick={(e) => {
                      e.stopPropagation();

                      if (cargandoFavorito) return;

                      if (esFavorito) {
                        eliminarFavorito(mostrar.id);
                      } else {
                        marcarFavorito(mostrar.id);
                      }
                    }}
                  />
                  {!esFavorito && (
                    <span className="texto-oculto">Marcar favorito</span>
                  )}
                  {esFavorito && (
                    <span className="texto-oculto">Desmarcar favorito</span>
                  )}
                </div>
              </div>

              {mostrar?.tipo === 2 && (
                <>
                  <div className="modal-detalle__fila modal-detalle__fila--selects">
                    <div className="modal-detalle__campo">
                      <h3>Temporada:</h3>
                      <select
                        value={temporada}
                        onChange={(e) => {
                          const nroTemp = e.target.value;
                          setTemporada(nroTemp);

                          const tempSeleccionada = mostrar?.temporadas?.find(
                            (t) => String(t.nro) === String(nroTemp),
                          );

                          setCapitulos(tempSeleccionada?.capitulos || []);
                          setCapituloSeleccionado(null);
                        }}
                      >
                        <option value="">Seleccionar</option>
                        {mostrar?.temporadas?.map((t, i) => (
                          <option key={i} value={t.nro}>
                            {t.nro}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="modal-detalle__campo">
                      <h3>Capítulo:</h3>
                      <select
                        value={capituloSeleccionado?.nro || ""}
                        onChange={(e) => {
                          const cap = capitulos.find(
                            (c) => String(c.nro) === e.target.value,
                          );
                          setCapituloSeleccionado(cap);
                        }}
                        disabled={!capitulos.length}
                      >
                        <option value="">Seleccionar</option>
                        {capitulos.map((c, i) => (
                          <option key={i} value={c.nro}>
                            {c.titulo}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {capituloSeleccionado && (
                    <div className="modal-detalle__fila">
                      <h3>Duración:</h3>
                      <p>{capituloSeleccionado.duracion} min</p>
                    </div>
                  )}
                </>
              )}

              <div className="modal-detalle__fila">
                <h3>Año:</h3>
                <p>{mostrar?.anio}</p>
              </div>

              <div className="modal-detalle__fila">
                <h3>Género:</h3>
                <div className="modal-detalle__generos">
                  {mostrar?.genero?.map((g, i) => (
                    <span key={i}>
                      {g.descripcion}
                      {i < mostrar.genero.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-detalle__fila">
                <h3>Actores:</h3>
                <div className="modal-detalle__actores">
                  {mostrar?.actores?.map((a, i) => (
                    <span key={i}>
                      <a
                        href={a.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {a.nombre} {a.apellido}
                      </a>
                      {i < mostrar.actores.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-detalle__fila">
                <h3>Resumen:</h3>
                <p>{mostrar?.resumen}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ModalDetalle;
