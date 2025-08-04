import Galeria from "../components/Galeria";

export default function Peliculas({CategoriaBuscador, opciones, contenido}){

    return(
        <div className="cuerpo">
            <CategoriaBuscador opciones={opciones}/>
            <Galeria contenido={contenido}/>
            <p>PELÍCULAS</p>
        </div>
    );
}