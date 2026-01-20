function ProximosLanzamientos() {
  return (
    <div className="releases">
      <section className="releases-section releases-section--current">
        <h2 className="releases-title">Estrenos de esta semana</h2>
        <article className="releases-grid" id="releases-current"></article>
      </section>

      <section className="releases-section">
        <h2 className="releases-title">Estrenos de la próxima semana</h2>
        <article className="releases-grid" id="releases-next-week"></article>
      </section>

      <section className="releases-section">
        <h2 className="releases-title">Estrenos del mes que viene</h2>
        <article className="releases-grid" id="releases-next-month"></article>
      </section>

      <section className="releases-section">
        <h2 className="releases-title">En grabación</h2>
        <article className="releases-grid" id="releases-filming"></article>
      </section>
    </div>
  );
}

export default ProximosLanzamientos;
