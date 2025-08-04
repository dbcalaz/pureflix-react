export default function Series({CategoriaBuscador, opciones}){

    return(
        <div className="cuerpo">
            <CategoriaBuscador opciones={opciones}/>
            <p>SERIES</p>
        </div>
    );
}