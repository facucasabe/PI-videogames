const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    details: []
}

function reducer (state=initialState, action) {
    switch(action.type) {
    case 'GET_GAMES':
        return {
            ...state,
            videogames: action.payload,
            allVideogames: action.payload
        }
    case 'FILTER_BY_TYPE':
        // la logica del reducer va antes del return
        const allGames = state.videogames
        const statusFiltered = action.payload === 'All' ? allGames : allGames.filter(e=> e.status === action.payload) // por payload me llevan los values del select
        return {
            ...state,
            videogames: statusFiltered
        }
    case 'FILTER_CREATED':
        const created = action.payload === 'db' ? state.allVideogames.filter(e => e.dbCreated) : state.allVideogames.filter(e => !e.dbCreated)
        return {
            ...state,
            videogames: created
        }
    case 'FILTER_BY_RATING':
        
        let rating = action.payload === 'asc' ? state.videogames.sort(function (a,b) {
            if (a.ratings > b.ratings) {
                return 1
            }
            if (b.ratings > a.ratings) {
                return -1
            }
            return 0 
            }) : state.videogames.sort(function (a,b) {
            if (a.ratings > b.ratings) {
                return -1
            }
            if (b.ratings > a.ratings){
                return 1
            }
            return 0
        })
        return {
            ...state,
            videogames: rating
        }
    case 'FILTER_BY_NAME':
        let sorted = action.payload === 'az' ? state.videogames.sort(function (a,b) {
            if (a.name > b.name) {
                return 1
            }
            if (b.name > a.name) {
                return -1
            }
            return 0 
            }) : state.videogames.sort(function (a,b) {
            if (a.name > b.name) {
                return -1
            }
            if (b.name > a.name){
                return 1
            }
            return 0
        })
        return {
            ...state,
            videogames: sorted
        }
    case 'POST_GAME':
        return{
            ...state
        }
    case 'GET_GENRES':
        return {
            ...state,
            genres: action.payload
        }
    case 'GET_BY_NAME':
        return {
            ...state,
            videogames: action.payload
        }
    case 'FILTER_BY_GENRE':
        const filtered = action.payload ? state.allVideogames.filter(e => e.genres.find(e => e.name === action.payload)) : state.allVideogames
        return {
            ...state,
            videogames: filtered
        }
    case 'GET_DETAILS':        
        return {
            ...state,
            details: action.payload
        }
    case 'CLEAR':
        return {
            ...state,
            details: []
        }
    default:
        return state
    }
}

export default reducer

// Reducers
// Un reducer toma un estado viejo (actual) y una acción y devuelve un estado nuevo. Un reducer debe ser una función pura, es decir:

// No debe mutar directamente el estado.
// No debe usar datos que no hayan sido pasada por argumentos.
// Los reducers siempre deben tratar el estado actual como sólo lectura. De hecho, el reducer no cambia el estado, si no que devuelve un estado nuevo. Para crear nuestro primer reducer, entonces, vamos a necesitar:

// Una acción, que nos define que hacer (opcionalmente con argumentos).
// El estado, que guarda toda la información de nuestro app.
// El reducer per se que recibe el estado y la acción y retorna el nuevo estado.
// Creando un Reducer
// Empezemos por el reducer más simple posible, es el que devuelve el estado actual. Similar a la función Identidad.

// var reducer = function(state, action) {
//   return state;
// } 

// Una acción sólo necesita una propiedad type:


// Funcion SORT:
// Si se provee compareFunction, los elementos del array son ordenados de acuerdo al valor que retorna dicha función de 
// comparación. Siendo a y b dos elementos comparados, entonces:

// Si compareFunction(a, b) es menor que 0, se sitúa a en un indice menor que b. Es decir, a viene primero.
// Si compareFunction(a, b) retorna 0, se deja a y b sin cambios entre ellos, pero ordenados con respecto a todos los elementos diferentes. 
// Nota: el estandar ECMAscript no garantiza este comportamiento, por esto no todos los navegadores 
// (p.ej.  Mozilla en versiones que datan hasta el 2003) respetan esto.
// Si compareFunction(a, b) es mayor que 0, se sitúa b en un indice menor que a.
// compareFunction(a, b) siempre debe retornar el mismo valor dado un par especifico de elementos a y b como sus argumentos. 
// Si se retornan resultados inconsistentes entonces el orden de ordenamiento es indefinido.

// basicamente el sort te va comparando dos valores y devuelve a la derecha o a la izquierda, es decir, antes o despues
// en el arreglo. 