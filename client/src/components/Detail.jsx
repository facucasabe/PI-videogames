import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDetails } from '../actions/actions'
import { useEffect } from 'react'
import { useParams } from 'react-router'

export default function Details() {

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(async () => {
        dispatch(getDetails(id)) // de esta forma yo accedo al id de ese detalle
    }, [dispatch])

    const myGame = useSelector(state => state.details)
    console.log(myGame)


    try {
        return (
            <div>
                {
                    // myGame.length > 0 ?
                    <div>
                        <h1>{myGame.name}</h1>
                        <img src={myGame.image} alt="Not Found" width="500px" heigth="700px" />
                        <h3>Genres: {myGame.genres}</h3>
                        <p>Description: {myGame.description}</p>
                        <p>Release Date: {myGame.date}</p>
                        <p>Rating: {myGame.rating}</p>
                        <p>Platforms: {myGame.platforms + ", "}</p>
                    </div>
                    // : <p>Loading...</p>

                }
                <Link to="/home">
                    <button>Back to Home</button>
                </Link>
            </div>
        )
    }
    catch (error) {
        return (
            <div>
                <h1>GAME NOT FOUND</h1>
            </div>
        )
    }


}
