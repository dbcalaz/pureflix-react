import Galeria from "../components/Galeria";

export default function Series({CategoriaBuscador, opciones, contenido}){

    return(
        <div className="cuerpo">
            <CategoriaBuscador opciones={opciones}/>
            <Galeria contenido={contenido}/>
            <p>SERIES</p>
        </div>
    );
}