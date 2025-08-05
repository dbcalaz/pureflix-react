import Galeria from "../components/Galeria";

export default function Series({CategoriaBuscador, opciones, contenido}){

    return(
        <div>
            <CategoriaBuscador opciones={opciones}/>
            <Galeria contenido={contenido}/>
        </div>
    );
}