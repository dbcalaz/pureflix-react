import { useState } from "react";
function ModalDetalle({ mostrar, setMostrar }) {
  const [temporada, setTemporada] = useState();
  const [capitulos, setCapitulos] = useState([]);
  const [capitulo, setCapitulo] = useState();
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
                <p id="titulo">{mostrar?.titulo}</p>
              </div>
              {mostrar.tipo === "pelicula" && (
                <div className="info_linea">
                  <h3>Duración:</h3>
                  <p id="duracion">{mostrar?.duracion}</p>
                </div>
              )}
              {mostrar.tipo === "serie" && (
                <div className="info_linea">
                  <h3>Temporadas:</h3>
                  <select
                    name="Temporadas"
                    id="Temporadas"
                    value={temporada || ""}
                    onChange={(e) => {
                      setTemporada(e.target.value);
                      const aux = [];
                      const cantCapitulos = mostrar?.temporadas.find(
                        (t) => parseInt(t.numero) === parseInt(e.target.value)
                      )?.capitulos;

                      for (let i = 1; i <= cantCapitulos; i++) aux.push(i);
                      setCapitulos(aux);
                      setCapitulo();
                    }}
                  >
                    <option key={"opcion_temporada_null"}>Seleccionar</option>
                    {mostrar?.temporadas.map((t, i) => (
                      <option key={"opcion_temporada_" + i}>{t.numero}</option>
                    ))}
                  </select>
                  <h3>Capítulos:</h3>
                  <select
                    name="Capitulo"
                    id="Capitulo"
                    value={capitulo || ""}
                    onChange={(e) => {
                      setCapitulo(e.target.value);
                    }}
                  >
                    <option key={"opcion_capitulo_null"}>Seleccionar</option>
                    {capitulos.map((c,i) => (
                      <option key={"opcion_capitulo_" + i}>{c}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="info_linea">
                <h3>Género:</h3>
                <div id="genero">{mostrar?.genero?.map((g,i) => (
                  <div key={"genero_" + i}>
                    <p>{g.descripcion}</p>
                  </div>
                ))}</div>
              </div>
              <div className="info_linea">
                <h3>Actores:</h3>
                <div id="actores">
                  {mostrar?.actores?.map((a, i) => (
                    <div key={"actor_" + i}>
                      <p>{a.nombre} {a.apellido}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="info_linea">
                <h3>Resumen:</h3>
                <p id="resumen">{mostrar?.resumen}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ModalDetalle;
