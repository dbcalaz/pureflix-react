import { useState } from "react";
import ImagenGenerica from "./ImagenGenerica";

function ModalDetalle({ mostrar, setMostrar }) {
  const [temporada, setTemporada] = useState("");
  const [capitulos, setCapitulos] = useState([]);
  const [capituloSeleccionado, setCapituloSeleccionado] = useState(null);

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
                <ImagenGenerica
                  className="modal-detalle__heart"
                  imagen="favorito"
                  onClick={(e) => {
                    e.stopPropagation();
                    marcarFavorito(mostrar.id);
                  }}
                />
                <span className="texto-oculto">Marcar favorito</span>
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
