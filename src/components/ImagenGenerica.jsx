import home from "../imagenes/home.png";
import peliSerie from "../imagenes/PeliSerie.png";
import perfil from "../imagenes/perfil.png";

const ImagenGenerica = ({ imagen }) => {
  let x;
  if (imagen === "home") x = home;
  else if (imagen === "peliSerie") x = peliSerie;
  else if (imagen === "perfil") x = perfil;
  return (
    <div>
      <img src={x} />
    </div>
  );
};

export default ImagenGenerica;
