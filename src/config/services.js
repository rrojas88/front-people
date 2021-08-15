
const urlBase = 'http://localhost:8000/api/'


const existError = ( data ) => {
	const infoData = {
		error: false,
		message: 'Ha ocurrido un error en el servidor',
		data: null,
	}
	if( data === undefined ){
		infoData.error = true
		return infoData
	}
	else if( data.hasOwnProperty('message') 
		&& data.message != ''){
		infoData.error = true
		infoData.message = data.message
		return infoData
	}

	infoData.message = ''
	infoData.data = data.data
	return infoData
}

export const httpGet = async ( mod ) => {
	let url = urlBase + mod;
	return await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}
	).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => {
		console.log('..Success GET:', response)
		return existError( response )
	})
}

export const http = async ( mod, data ) => {
	let url = urlBase + mod;
	let action = 'POST'
	if( data.hasOwnProperty('id') ){
		if( data.id != 0 && data.id !== null ){
			url += `/${data.id}`
			action = 'PUT'
		}
	}
	const srtData = JSON.stringify(data)
	console.info('Data POST/PUT', data)
	return await fetch(url, {
		method: action,
		body: srtData,
		headers:{
			'Content-Type': 'application/json'
		}
	}
	).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => {
		console.log('Success SAVE:', response)
		return existError(response)
	})
}

export const httpDel = async ( mod, id ) => {
	let url = urlBase + mod + '/' + id
	let action = 'DELETE'
	return await fetch(url, {
		method: action,
		headers:{
			'Content-Type': 'application/json'
		}
	}
	).then(res => res.json())
	.catch(error => console.error('Error:', error))
	.then(response => {
		console.log('Success Delete:', response)
		return existError(response)
	})
}
