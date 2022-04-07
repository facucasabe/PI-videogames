import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames, filterCreated, filterByName, getGenres, filterByGenre, filterByRating } from "../actions/actions.js"
import { Link } from "react-router-dom"
import Card from "../components/Card.jsx"
import Paged from "../components/Paged.jsx"
import SearchBar from "./SearchBar.jsx"


export default function Home() {

    const dispatch = useDispatch() // para usar la constante que pasamos en acciones
    const allGames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres)
    const [currentPage, setCurrentPage] = useState(1) // mi pagina actual que va a arrancar en 1
    const [gamesPerPage, setGamesPerPage] = useState(15) // mis personajes por pagina, que son 15
    const indexOfLastGame = currentPage * gamesPerPage // va a ser 15, indice del ultimo juego por pagina
    const indexOfFirstGame = indexOfLastGame - gamesPerPage //
    const [orden, setOrden] = useState('')  // estado local para el handleFilterByName


    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)

    const paged = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }

    useEffect(() => {
        dispatch(getVideogames())  // este dispatch reemplaza el mapdispatchtoprops
    }, [dispatch])

    useEffect(() => {
        dispatch(getGenres())
    }, [])

    function handleClick(event) { // useEffect cuando se recaarga la pagina, recarga los estados de redux
        event.preventDefault(); // por eso el preventDefault hace que cuando se recargue se carguen todos los juegos
        dispatch(getVideogames())
    }

    function HandlefilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleFilterByName(e) {
        e.preventDefault()
        dispatch(filterByName(e.target.value))
        setCurrentPage(1)  // quiero setear la pagina en 1, pero tambien quiero un estado que me lo setee
        setOrden(`ordered ${e.target.value}`) // es un estado local que arranca vacio y que aca lo seteo ordenado de tal forma, 
        //                                      solo para que me haga la modificacion en el renderizado
    }

    function handleFilterByRating(e) {
        dispatch(filterByRating(e.target.value))
        setCurrentPage(1)
        setOrden(`ordered ${e.target.value}`)
    }

    function handleFilterByGenre(e) {
        e.preventDefault()
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
        setOrden(`ordered ${e.target.value}`)
    }

    return (
        <div>

            <br />
            <Link to='/videogame'>Create New Game</Link>
            <h1>WeLcOmE</h1>
            <SearchBar />
            <button onClick={(e => { handleClick(e) })}>
                Reload All Games
            </button>
            <div>
                <select onChange={u => handleFilterByName(u)}>
                    <option value="az">A to Z</option>
                    <option value="za">Z to A</option>
                </select>
                <select onChange={e => handleFilterByRating(e)}>
                    <option value="asc">Highest to Lowest Rating</option>
                    <option value="desc">Lowest to Highest Rating</option>
                </select>
                <select onChange={e => HandlefilterCreated(e)}>
                    <option value="all">All Games</option>
                    <option value="api">Api Games</option>
                    <option value="db">Created Games</option>
                </select>
                <br />
                <label>Filter by Genre</label>
                <br />
                <select onChange={e => handleFilterByGenre(e)}>
                    {genres.map(g => (
                        <option value={g.name} key={g.id}>{g.name}</option>
                    ))}
                </select>
                <br />
                <br />
                <Paged
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paged={paged}
                />
                {currentGames &&
                    currentGames.map(e => {
                        // if (e.name && e.genres && e.image) {
                        return <Card name={e.name} genres={e.genres.map(n => n.name)} image={e.image} key={e.id} ratings={e.ratings} id={e.id} />
                    })
                }
            </div>

        </div>
    )

}

// const       es lo mismo que usar el mapstatetoprops, pero es mas facil.
// PROBAR HACER CON MAPSTATETOPROPS Y MAPDISPATCHTOPROPS

// Lo importante de los estados locales, mas usando redux, es entender que hay componentes que van a
// prescindir del estado local, porque ejecutan cosas solo dentro de ese componente.
// Entonces, si hay algo que solo ese componente tiene que hacer, como es el caso del paginado,
// que va a funcionar solo en el home, cuando me vaya a detalles o a otra ruta, no lo quiero tener,
// entonces para que voy a llevar la logica dentro del estado global.