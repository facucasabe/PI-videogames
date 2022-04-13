import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clear, getDetails } from '../actions/actions'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import Loading from './Loading.jsx'
import NotFound from './NotFound.jsx'

export default function Details() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const myGame = useSelector(state => state.details)
    const loading = useSelector(state => state.loading)
    const notfound = useSelector(state => state.notfound)

    useEffect(() => {
        dispatch(clear())
        dispatch(getDetails(id)) // de esta forma yo accedo al id de ese detalle
        if (notfound) {
            navigate("/notfound")
        }
    }, [dispatch, id, notfound])

    try {
        return (
            <div style={{ overflow: "hidden" }}  >
                {loading && <Loading />}
                {!loading &&
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
                            <img className='detailimg' src={myGame.image} height="300px" width="400px" alt="Not Found" />
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
                }

            </div >
        )
    }
    catch (error) {
        console.log("error: ", error)
        return (
            <div>
                <NotFound />
            </div>
        )
    }
}
