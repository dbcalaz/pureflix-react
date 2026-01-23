/*const formatData = (datos) => {
	return Object.entries(datos)
		.map(([key, value]) => `${key}:${value}`)
		.join("\n")
}*/

const FetchPost = async (url, datos) => {
	//const formattedData = formatData(datos)
	const servidor = import.meta.env.VITE_SERVER
	const puerto = import.meta.env.VITE_PORT
	try {
		const res = await fetch(`http://${servidor}:${puerto}/${url}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify(datos),
		})

		if (!res.ok) {
			console.log("Devolviendo", res)
		//	throw new Error(`HTTP error! status: ${res.status}`)
		}

		return res
	} catch (error) {
		console.error("Error al enviar la solicitud:", error, servidor, puerto)
		throw error
	}
}

export default FetchPost;
