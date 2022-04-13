import React from "react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getVideogames, filterCreated, filterByName, getGenres, filterByGenre, filterByRating } from "../actions/actions.js"
import { Link } from "react-router-dom"
import Card from "../components/Card.jsx"
import Paged from "../components/Paged.jsx"
import SearchBar from "./SearchBar.jsx"
import Loading from "./Loading.jsx"


export default function Home() {

    const dispatch = useDispatch() // para usar la constante que pasamos en acciones
    const allGames = useSelector((state) => state.videogames)
    const genres = useSelector((state) => state.genres)
    const loading = useSelector((state) => state.loading)
    const [currentPage, setCurrentPage] = useState(1) // mi pagina actual que va a arrancar en 1
    const [gamesPerPage, setGamesPerPage] = useState(15) // mis personajes por pagina, que son 15
    const indexOfLastGame = currentPage * gamesPerPage // va a ser 15, indice del ultimo juego por pagina
    const indexOfFirstGame = indexOfLastGame - gamesPerPage //
    const [orden, setOrden] = useState('')  // estado local para el handleFilterByName

    let currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame)

    const paged = (pageNumbers) => {
        setCurrentPage(pageNumbers)
    }

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    }, [dispatch])


    function handleClick(event) { // useEffect cuando se recaarga la pagina, recarga los estados de redux
        event.preventDefault(); // por eso el preventDefault hace que cuando se recargue se carguen todos los juegos
        dispatch(getVideogames())
    }

    function HandlefilterCreated(e) {
        e.preventDefault()
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
        < div >
            {
                loading && <Loading />
            }

            <br />
            <br />
            <Link to='/videogame'>
                <button className="buttoncreate">Create New Game</button>
            </Link>
            <h1 className="welcome">HENRY GAMES</h1>
            <SearchBar />
            <br />
            <button className="buttonreload" onClick={(e => { handleClick(e) })}>
                Reload All Games
            </button>
            <br />
            <br />
            <div>
                <select defaultValue="default" onChange={u => handleFilterByName(u)}>
                    <option key="" value="default" hidden>Sort by Name</option>
                    <option key="az" value="az">A to Z</option>
                    <option key="za" value="za">Z to A</option>
                </select>
                <select defaultValue="default" onChange={e => handleFilterByRating(e)}>
                    <option key="" value="default" hidden>Sort by Rating</option>
                    <option key="asc" value="asc">Highest to Lowest Rating</option>
                    <option key="desc" value="desc">Lowest to Highest Rating</option>
                </select>
                <select defaultValue="all" onChange={e => HandlefilterCreated(e)}>
                    <option key='all' value="all">All Games</option>
                    <option key='api' value="api">Api Games</option>
                    <option key='db' value="db">Created Games</option>
                </select>
                <br />
                <label className="genretit">Filter by Genre</label>
                <br />
                <select defaultValue="all" onChange={e => handleFilterByGenre(e)}>
                    <option key="" value="all">All Genres</option>
                    {genres.map(g => (
                        <option value={g.name} key={g.name}>{g.name}</option>
                    ))}
                </select>
                <br />
                <br />
                <Paged
                    currentPage={currentPage}
                    gamesPerPage={gamesPerPage}
                    allGames={allGames.length}
                    paged={paged}
                />
                <br />
                {currentGames.length > 0 ?
                    currentGames.map(e => {

                        return <Card name={e.name} genres={e.genres.map(n => n.name)} image={e.image} key={e.id} ratings={e.ratings} id={e.id} />
                    }) :
                    <p style={{ fontSize: "1.6rem", color: "white" }}>Game Not Found</p>
                }
            </div>

        </div >
    )

}

// const       es lo mismo que usar el mapstatetoprops, pero es mas facil.

// Lo importante de los estados locales, mas usando redux, es entender que hay componentes que van a
// prescindir del estado local, porque ejecutan cosas solo dentro de ese componente.
// Entonces, si hay algo que solo ese componente tiene que hacer, como es el caso del paginado,
// que va a funcionar solo en el home, cuando me vaya a detalles o a otra ruta, no lo quiero tener,
// entonces para que voy a llevar la logica dentro del estado global.