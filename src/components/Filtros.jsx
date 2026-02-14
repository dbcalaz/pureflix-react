import { useEffect } from "react";
const servidor = import.meta.env.VITE_SERVER;
const puerto = import.meta.env.VITE_PORT;

function Filtros({
  categorias,
  setCategorias,
  catSeleccionada,
  setCatSeleccionada,
  setPalabra,
}) {
  useEffect(() => {
    async function obtenerCategorias() {
      try {
        const res = await fetch(`http://${servidor}:${puerto}/getCategorias`);
        const data = await res.json();
        setCategorias(data);
      } catch (e) {
        console.log("Error:", e);
      }
    }

    obtenerCategorias();
  }, []);

  return (
    <section className="filters">
      <div className="filters__container">
        <form className="filters__form">
          <label className="filters__label" htmlFor="categoria">
            Categoría
          </label>

          <select
            name="categoria"
            id="categoria"
            className="filters__select"
            value={catSeleccionada}
            onChange={(e) => setCatSeleccionada(e.target.value)}
          >
            <option value="vacio">Seleccionar categoría</option>
            {categorias?.map((c, i) => {
              return (
                <option key={"categoria_" + i} value={c.id}>
                  {c.descripcion}
                </option>
              );
            })}
          </select>
        </form>

        <form className="filters__search">
          <input
            type="search"
            className="filters__input"
            placeholder="Buscar por nombre"
            onChange={(e) => setPalabra(e.target.value)}
            id="filter_search"
          />
        </form>
      </div>
    </section>
  );
}

export default Filtros;
