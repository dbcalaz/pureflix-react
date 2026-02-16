import { useEffect } from "react";
const servidor = import.meta.env.VITE_SERVER;
const puerto = import.meta.env.VITE_PORT;

function HeaderVistaDesktop({
  vista,
  categorias,
  setCategorias,
  catSeleccionada,
  setCatSeleccionada,
}) {
  const obtenerTitulo = () => {
    if (vista === "series") return "Series";
    if (vista === "peliculas") return "Películas";
    return null;
  };

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

  if (vista !== "series" && vista !== "peliculas") return null;

  return (
    <div className="header-vista-desktop">
      <h1 className="header-vista-desktop__titulo">{obtenerTitulo()}</h1>

      <select
        className="header-vista-desktop__select"
        value={catSeleccionada}
        onChange={(e) => setCatSeleccionada(Number(e.target.value))}
      >
        <option value={0}>Géneros</option>

        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.descripcion}
          </option>
        ))}
      </select>
    </div>
  );
}

export default HeaderVistaDesktop;
