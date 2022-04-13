const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    details: [],
    loading: false,
    filterGenre: [],
    filterGenreName : [],
    filterGame: [],
    notfound: false
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

    if (state.filterGenre.length > 0 ) {
        state.videogames = [...state.allVideogames]
        if (action.payload === 'db') {

            const filter1 = state.allVideogames.filter(e => e.dbCreated)
            if (state.filterGenreName === "all") {
                
                
                return {
                    ...state,
                    videogames: filter1,
                    filterGame: filter1
                }
            } else {
                const filtered1  = filter1.filter(e => e.genres.find(p => p.name === state.filterGenreName))  

                return {
                    ...state,
                    videogames: filtered1,
                    filterGame: filtered1
                }
            }
        }
        else if (action.payload === 'api') {

            const api = state.videogames.filter(e => !e.dbCreated)
            if (state.filterGenreName === "all") {
                
                return {
                    ...state,
                    videogames: api,
                    filterGame: api
                }
            } else {
                const filtered = api.filter(e => e.genres.find(p => p.name === state.filterGenreName))

                return {
                    ...state,
                    videogames: filtered,
                    filterGame: filtered
                }
            }
        }
        else if (action.payload === 'all'){
            if (state.filterGenreName === "all") {
                return {
                    ...state,
                    videogames: state.allVideogames,
                    filterGame: state.allVideogames
                }
            } else {
            const created = state.videogames.filter(e => e.genres.find(u => u.name === state.filterGenreName))
            return {
                ...state,
                videogames: created,
                filterGame: created,
                
            }
        }
        }          
        
    } else {
        state.videogames = [...state.allVideogames]
        if (action.payload === 'db') {
            const filter1 = state.allVideogames.filter(e => e.dbCreated)
            const filtered = state.filterGenreName.length > 0 ? filter1.filter(e => e.genres.find(p => p.name === state.filterGenreName)) : filter1
                        
            return {
                ...state,
                videogames: filtered,
                filterGame: filtered
            }
        }
        else if (action.payload === 'api') {
            const created = state.allVideogames.filter(e => !e.dbCreated)            
            return {
                ...state,
                videogames: created,
                filterGame: created
            }
        }
        else {
            const created = state.allVideogames
            return {
                ...state,
                videogames: created,
                filterGame: created
            }
        }
    }
    case 'FILTER_BY_RATING':
            
            let rating = action.payload === 'desc' ? state.videogames.sort(function (a,b) {
                if (a.ratings === 'exceptional') {
                    return 1
                }
                if (b.ratings === 'exceptional') {
                    return -1
                }
                if (a.ratings === 'recommended' && b.ratings === 'meh') {
                    return 1
                }
                if (b.ratings === 'recommended' && a.ratings === 'meh') {
                    return -1
                }
                if (a.ratings === 'skip') {
                    return 1
                }
                if (b.ratings === 'skip') {
                    return -1
                }
                return 0
            }) : state.videogames.sort(function (a,b) {
                if (a.ratings === 'exceptional') {
                    return -1
                }
                if (b.ratings === 'exceptional') {
                    return 1
                }
                if (a.ratings === 'recommended' && b.ratings === 'meh') {
                    return 1
                }
                if (b.ratings === 'recommended' && a.ratings === 'meh') {
                    return -1                    
                }
                if (a.ratings === 'skip') {
                    return -1
                }
                if (b.ratings === 'skip') {
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

    if (state.filterGame.length > 0 ) {
                
        state.videogames = [...state.allVideogames]      
        
        if (state.filterGame[0].dbCreated) {       
            
            const filt = state.allVideogames.filter(e => e.dbCreated)
            const filtered = action.payload === 'all' ? filt :  filt.filter(e => e.genres.find(e => e.name === action.payload))
            
            return {
                ...state,
                videogames: filtered,
                filterGenreName: action.payload,
                filterGenre: filtered
            }
        } 

        if (!state.filterGame[0].dbCreated){
            
            const notdb = state.allVideogames.filter(e => !e.dbCreated)
            const filtered = action.payload === 'all' ? notdb :  notdb.filter(e => e.genres.find(e => e.name === action.payload))
            
            return {
                ...state,
                videogames: filtered,
                filterGenre: filtered,
                filterGenreName: action.payload
            }
            
        }
    }
    else {
        state.videogames = [...state.allVideogames]
        const filtered = action.payload === 'all' ? state.videogames :  state.allVideogames.filter(e => e.genres.find(e => e.name === action.payload))
        return {
            ...state,                
            videogames: filtered,
            filterGenreName: action.payload,
            filterGenre: filtered 
        }
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
    case 'LOADER':
        return {
            ...state,
            loading: !state.loading
        }
    case 'NOT_FOUND':
        return {
            ...state,
            notfound: !state.notfound
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

// basicamente el sort te va comparando dos valores y devuelve a la derecha o a la izquierda, es decir, antes o despues
// en el arreglo. 
