import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postVideogames, getGenres } from "../actions/actions"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // useHistory es un metodo del router que me redirige a la ruta que le indique

export function GameCreate() {
    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genres)

    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        description: "",
        date: "",
        ratings: "",
        platforms: [],
        image: "",
        genres: []

    })

    function validate(input) {
        let errors = {};
        if (!input.name) {
            errors.name = 'Game must have a name'
        } else if (!input.description) {
            errors.description = 'Game must have a description'
        } else if (!input.platforms) {
            errors.platforms = 'Game must have a platform'
        }
        return errors
    }

    function handleChange(e) {  // va a ir manejando cada vez que se cambien mis inputs
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))

    }

    function handleCheck(e) {
        if (e.target.checked) {  // es un booleano, devuelve true si está checkeado
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
    }

    function handleSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleRatings(e) {
        setInput({
            ...input,
            ratings: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postVideogames(input))
        alert("Game Created Succesfully")
        setInput({
            name: "",
            description: "",
            date: "",
            ratings: [],
            platforms: [],
            image: "",
            genres: []
        })

    }

    function handleDelete(e) {
        setInput({
            ...input,
            genres: input.genres.filter(u => u !== e)
        })
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    return (
        <div>
            <Link to='/home'>
                <button>Back to Home!</button>
            </Link>
            <h1>Create Game!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={input.name} name="name" onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" value={input.description} name="description" onChange={e => handleChange(e)} />
                    {errors.description && (
                        <p className="error">{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Date:</label>
                    <input type="text" value={input.date} name="date" onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Platforms:</label>
                    <br />
                    <label><input type="checkbox" name="PC" value="PC" onChange={e => handleCheck(e)} />PC</label>
                    <label><input type="checkbox" name="play" value="play" onChange={e => handleCheck(e)} />PlayStation</label>
                    <label><input type="checkbox" name="xbox" value="xbox" onChange={e => handleCheck(e)} />Xbox</label>
                    <br />
                    <label><input type="checkbox" name="ios" value="ios" onChange={e => handleCheck(e)} />iOS</label>
                    <label><input type="checkbox" name="android" value="android" onChange={e => handleCheck(e)} />Android</label>
                    <label><input type="checkbox" name="apple" value="apple" onChange={e => handleCheck(e)} />Apple Macinthos</label>
                    <br />
                    <label><input type="checkbox" name="linux" value="linux" onChange={e => handleCheck(e)} />Linux</label>
                    <label><input type="checkbox" name="nintendo" value="nintendo" onChange={e => handleCheck(e)} />Nintendo</label>
                    <label><input type="checkbox" name="xbox" value="xbox" onChange={e => handleCheck(e)} />Xbox</label>
                    {errors.platforms && (
                        <p className="error">{errors.platforms}</p>
                    )}
                </div>
                <div>
                    <label>Ratings:</label>
                    <select onChange={e => handleRatings(e)}>
                        <option value="exceptional" key="1">Exceptional</option>
                        <option value="recommended" key="2">Recommended</option>
                        <option value="meh" key="3">Meh</option>
                        <option value="skip" key="4">Skip</option>
                    </select>
                </div>
                <select onChange={e => handleSelect(e)}>
                    {genres.map(g => (
                        <option value={g.name} key={g.id}>{g.name}</option>
                    ))}
                </select>
                <ul><li>{input.genres.map(e => e + ",")}</li></ul>
                <div>
                    <label>Image:</label>
                    <input type="text" value={input.image} name="image" onChange={handleChange} />
                    <br />
                    <img src={input.image} alt="Not Found" />
                </div>
                <button type="submit">Create Videogame!</button>
            </form>
            {input.genres.map(e =>
                <div className="divGen">
                    <p>{e}</p>
                    <button className="delbutton" onClick={() => handleDelete(e)}>x</button>
                </div>)
            }
        </div>
    )
}

