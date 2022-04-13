import axios from "axios"

export function getVideogames() {
    return async function(dispatch) {
        dispatch(loader())
        var json = await axios.get("http://localhost:3001/videogames",{})
        dispatch(loader())
        return dispatch({
                type: 'GET_GAMES',
                payload: json.data 
            })
    }
}

export function filterCreated (payload) {  // payload va a ser el value de la opcion que se elija
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function filterByName (payload) {
    return {
        type: 'FILTER_BY_NAME',
        payload
    }
}

export function filterByRating (payload) {
    return {
        type: 'FILTER_BY_RATING',
        payload
    }
}

export function filterByGenre (payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function getByName (name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/videogames?name=" + name)
            console.log(name)
            console.log(json)
            return dispatch({
                type: 'GET_BY_NAME',
                payload: json.data
            })
        }
        catch(error) {console.log(error)}
    }
}

export function getGenres() {
    return async function (dispatch) {
        var allGenres = await axios.get("http://localhost:3001/genres", {})                
        return dispatch({type: 'GET_GENRES', payload: allGenres.data})
    }
}

export function postVideogames(payload) {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/videogame", payload)
        return response
    }
    
}

export function getDetails (id) {
    return async function (dispatch) {
        try {
            dispatch(loader())
            var json = await axios.get(`http://localhost:3001/videogame/${id}`)
            dispatch(loader())
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        }
        catch (error) {
            console.log("error de id")
            dispatch(loader())
            dispatch(notfound())
        }
    }
}

export function clear () {
    return {
        type: "CLEAR"
    }
}

export function notfound () {
    return {
        type: 'NOT_FOUND'
    }
}

export function loader (){
    return {
        type: 'LOADER'
    }
}

// con fetch: es fetch() en lugar de axios.get

// con fetch vas a tener que usar promesas con .then, y
// con axios te devuelve la respuesta en un .data.

// En actions siempre la idea es pasar solamente un tipo de accion,
// dejar la logica para el reducer