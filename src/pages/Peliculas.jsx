export default function Peliculas({CategoriaBuscador, opciones}){

    return(
        <div className="cuerpo">
            <CategoriaBuscador opciones={opciones}/>
            <p>PELÍCULAS</p>
        </div>
    );
}