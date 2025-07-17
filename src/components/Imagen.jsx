import home from "../images/home.png";
import perfil from "../images/perfil.png";
import peliSerieLan from "../images/PeliSerie.png";
import { useState, useEffect } from "react";

const ImagenesNavBar = ({ nombreArchivo }) => {
  const [img, setImg] = useState(home);

  useEffect(() => {
    if (nombreArchivo === "perfil") setImg(perfil);
    if (nombreArchivo === "peliSerieLan") setImg(peliSerieLan);
  }, []);

  return (
      <img src={img} />
  );
};
export default ImagenesNavBar;
