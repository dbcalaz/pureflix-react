import Galeria from "../components/Galeria";

export default function Peliculas({CategoriaBuscador, opciones, contenido, setMostrarModalDetalle }){

    return(
        <div>
            <CategoriaBuscador opciones={opciones}/>
            <Galeria contenido={contenido} setMostrarModalDetalle={setMostrarModalDetalle }/>
        </div>
    );
}