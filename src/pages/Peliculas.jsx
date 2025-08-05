import Galeria from "../components/Galeria";

export default function Peliculas({CategoriaBuscador, opciones, contenido}){

    return(
        <div>
            <CategoriaBuscador opciones={opciones}/>
            <Galeria contenido={contenido}/>
        </div>
    );
}