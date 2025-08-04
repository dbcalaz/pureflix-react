import Galeria from "../components/Galeria";

export default function Home({ CategoriaBuscador, opciones, contenido }) {
  return (
    <div className="cuerpo">
      <CategoriaBuscador opciones={opciones}/>
      <Galeria contenido={contenido}/>
    </div>
  );
}
