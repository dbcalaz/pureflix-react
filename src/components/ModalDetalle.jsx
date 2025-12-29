import Contenido from "./Contenido";

function ModalDetalle({ mostrar, setMostrar }) {
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
              <div className="video" id="video"></div>
              <a id="linkVideo" target="_blank">
                <button className="boton">Comenzar</button>
              </a>
            </div>
            <div className="info_descripcion">
              <div className="info_linea">
                <h3>Título:{mostrar.titulo}</h3>
                <p id="titulo"></p>
              </div>
              <div className="info_linea">
                <h3>Duración:{mostrar.duracion}</h3>
                <p id="duracion"></p>
              </div>
              <div className="info_linea">
                <h3>Género:{mostrar.genero}</h3>
                <p id="genero"></p>
              </div>
              <div className="info_linea">
                <h3>
                  Actores:
                  {mostrar.actores.map((a) => (
                    <>
                      <div>{a.nombre}</div>
                      {/*<div>{a.wikipedia}</div>*/}
                    </>
                  ))}
                </h3>
                <p id="actores"></p>
              </div>
              <p id="resumen"></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ModalDetalle;
