function ProximosLanzamientos() {
  return (
    <>
      <div className="container">
        <section className="box-seccion uno">
          <h2>Estrenos de esta semana</h2>
          <article className="box" id="esta_semana"></article>
        </section>
        <section className="box-seccion">
          <h2>Estrenos de la próxima semana</h2>
          <article className="box" id="proxima_semana"></article>
        </section>
        <section className="box-seccion">
          <h2>Estrenos del mes que viene</h2>
          <article className="box" id="proximo_mes"></article>
        </section>
        <section className="box-seccion">
          <h2>En grabación</h2>
          <article className="box" id="en_grabacion"></article>
        </section>
      </div>
    </>
  );
}

export default ProximosLanzamientos;
