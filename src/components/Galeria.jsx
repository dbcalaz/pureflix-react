import Contenido from "./Contenido";
import ImagenGenerica from "./ImagenGenerica";

function concatenaCosas (c){
  const todo=[]
  c?.series.forEach(x =>{todo.push(x)})
  c?.peliculas.forEach(x =>{todo.push(x)})
  return todo
}

function Galeria({ tipo, setMostrarModalDetalle }) {
  let miArray;
  switch (tipo){
    case "pelis":
      miArray = Contenido.peliculas;
      break;
    case "series":
      miArray = Contenido.series;
      break;
    case "home":
    miArray = concatenaCosas(Contenido);
    break;
    default:
      miArray=[]
  }
  return (
    <>
      <section className="galeria">
        {miArray.map((p, i) => {
          return (
            <div key={"foto_" + tipo + "_" + i} className="foto" onClick={() => {setMostrarModalDetalle(p)}}>
              <ImagenGenerica imagen={p.imagen.split(".")[0]}/>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Galeria;
