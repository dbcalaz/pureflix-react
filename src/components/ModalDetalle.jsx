export default function ModalDetalle({setMostrarModalDetalle, d }) {
  return (
    <section className="modal">
      <div className="fondo-modal" onClick={() => {setMostrarModalDetalle({})}} />
      <div className="info_contenido">
        <div className="video_contenedor">
          <div className="video" id="video"><iframe src={d?.iframe}></iframe></div>
          <a id="linkVideo" target="_blank">
            <button className="boton">Comenzar</button>
          </a>
        </div>
        <div className="info_descripcion">
          <div className="info_linea">
            <h3>Título:</h3>
            <p id="titulo">{d.titulo}</p>
          </div>
          <div className="info_linea">
            <h3>Duración:</h3>
            <p id="duracion">{d.duracion}</p>
          </div>
          <div className="info_linea">
            <h3>Género:</h3>
            <p id="genero">{d.genero}</p>
          </div>
          <div className="info_linea">
            <h3>Actores:</h3>
            <p id="actores">{d?.actores?.map((a,i) => {
              return <a key={"detalle_"+i} href={a.wikipedia} target="_blank">{a.nombre}</a>
            })}</p>
          </div>
          <p id="resumen">{d.resumen}</p>
        </div>
      </div>
    </section>
  );
}
