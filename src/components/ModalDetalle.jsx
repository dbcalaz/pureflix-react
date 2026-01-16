import { useState } from "react";

function ModalDetalle({ mostrar, setMostrar }) {
  const [temporada, setTemporada] = useState("");
  const [capitulos, setCapitulos] = useState([]);
  const [capituloSeleccionado, setCapituloSeleccionado] = useState(null);

  return (
    <div className="modal">
      <div
        className="modal-bg"
        onClick={() => {
          setMostrar({});
        }}
      ></div>

      <div className="contenido-modal">
        <section className="info">
          <div className="info_contenido">
            <div className="video_contenedor">
              <div className="video" id="video">
                <iframe src={mostrar?.link_trailer}></iframe>
              </div>
              <button className="boton">Comenzar</button>
            </div>

            <div className="info_descripcion">
              <div className="info_linea">
                <h3>Título:</h3>
                <p>{mostrar?.titulo}</p>
              </div>

              {mostrar?.tipo === 2 && (
                <>
                  <div className="info_linea">
                    <h3>Temporadas:</h3>
                    <select
                      value={temporada}
                      onChange={(e) => {
                        const nroTemp = e.target.value;
                        setTemporada(nroTemp);

                        const tempSeleccionada = mostrar?.temporadas?.find(
                          (t) => String(t.nro) === String(nroTemp)
                        );

                        setCapitulos(tempSeleccionada?.capitulos || []);
                        setCapituloSeleccionado(null); // reset
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {mostrar?.temporadas?.map((t, i) => (
                        <option key={"temporada_" + i} value={t.nro}>
                          {t.nro}
                        </option>
                      ))}
                    </select>

                    <h3>Capítulos:</h3>
                    <select
                      value={capituloSeleccionado?.nro || ""}
                      onChange={(e) => {
                        const nroCap = e.target.value;
                        const cap = capitulos.find(
                          (c) => String(c.nro) === String(nroCap)
                        );
                        setCapituloSeleccionado(cap);
                      }}
                      disabled={!capitulos.length}
                    >
                      <option value="">Seleccionar</option>
                      {capitulos.map((c, i) => (
                        <option key={"capitulo_" + i} value={c.nro}>
                          {c.titulo}
                        </option>
                      ))}
                    </select>
                  </div>

                  {capituloSeleccionado && (
                    <div className="info_linea">
                      <h3>Duración:</h3>
                      <p>{capituloSeleccionado.duracion} min</p>
                    </div>
                  )}
                </>
              )}

              <div className="info_linea">
                <h3>Año:</h3>
                <p>{mostrar?.anio}</p>
              </div>

              <div className="info_linea">
                <h3>Género:</h3>
                <div id="genero">
                  {mostrar?.genero?.map((g, i) => (
                    <div key={"genero_" + i}>
                      <p>{g.descripcion}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="info_linea">
                <h3>Actores:</h3>
                <div id="actores">
                  {mostrar?.actores?.map((a, i) => (
                    <div key={"actor_" + i}>
                      <p>
                        {a.nombre} {a.apellido}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="info_linea">
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
