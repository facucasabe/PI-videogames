import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clear, getDetails } from '../actions/actions'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import Loading from './Loading.jsx'

export default function Details() {

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(async () => {
        dispatch(clear())
        dispatch(getDetails(id)) // de esta forma yo accedo al id de ese detalle
    }, [dispatch])

    const myGame = useSelector(state => state.details)
    const loading = useSelector(state => state.loading)
    try {
        return (
            <div style={{ overflow: "hidden" }}  >
                {loading && <Loading />}
                {!loading &&
                    // myGame.length > 0 ?

                    <div className="detail">
                        <div className='itemBtn'>
                            <Link to="/home">
                                <button className='buttondetail'>Back to Home</button>
                            </Link>
                        </div>
                        <div className='itemName'>
                            <h1>{myGame.name}</h1>
                            <br />
                            <h3>Genres: {myGame.genres + " "}</h3>
                        </div>
                        <div className='itemImg'>
                            <img className='detailimg' src={myGame.image} height="300px" width="400px" />
                        </div>
                        <div className='description'>
                            <label>Description: </label>
                            <h5>{myGame.description}</h5>
                        </div>
                        <div className='itemInfo'>
                            <p>Release Date: {myGame.date}</p>
                            <p>Rating: {myGame.rating}</p>
                            <p>Platforms: {myGame.platforms + ", "}</p>
                        </div>

                    </div>
                    // : <p>Loading...</p>

                }

            </div >
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
