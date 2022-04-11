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
        }
        return errors
    }

    function handleChange(e) {  // va a ir manejando cada vez que se cambien mis inputs
        e.preventDefault()
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
        e.preventDefault()
        if (e.target.checked) {  // es un booleano, devuelve true si está checkeado
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
    }

    function handleSelect(e) {
        e.preventDefault()
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleRatings(e) {
        e.preventDefault()
        setInput({
            ...input,
            ratings: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()


        if (input.name.length >= 1 && input.description.length >= 1) {
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
        else { alert("Complete the missing info") }

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
        <div className="create">
            <br />
            <Link to='/home' className="backhome" >
                <button style={{ borderRadius: "5px", backgroundColor: "ActiveCaption" }}>Back to Home!</button>
            </Link>
            <h1 className="formtitle">Create Game:</h1>
            <form className="form" onSubmit={e => handleSubmit(e)}>

                <div className="formName">
                    <input style={{ width: "220px" }} placeholder="Name" type="text" value={input.name} name="name" onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <br />
                <div>
                    <input style={{ width: "220px" }} placeholder="Description" type="text" value={input.description} name="description" onChange={e => handleChange(e)} />
                    {errors.description && (
                        <p>{errors.description}</p>
                    )}
                </div>
                <br />
                <div>
                    <input style={{ width: "220px" }} placeholder="Release date" type="text" value={input.date} name="date" onChange={e => handleChange(e)} />
                </div>
                <br />
                <div>
                    <label>Platforms:</label>
                    <br />
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

                </div>
                <br />
                <div>
                    <label>Ratings:</label>
                    <br />
                    <select style={{ width: "225px" }} onChange={e => handleRatings(e)} className="ratingselect">
                        <option value="exceptional" key="1">Exceptional</option>
                        <option value="recommended" key="2">Recommended</option>
                        <option value="meh" key="3">Meh</option>
                        <option value="skip" key="4">Skip</option>
                    </select>
                </div>
                <br />
                <label>Genres:</label>
                <br />
                <select onChange={e => handleSelect(e)} className="genreselect" style={{ width: "225px" }} >
                    {genres.map(g => (
                        <option value={g.name} key={g.id}>{g.name}</option>
                    ))}
                </select>


                <br />
                <br />

                <input style={{ width: "220px" }} placeholder="Image URL" type="text" value={input.image} name="image" onChange={handleChange} />
                <br />


            </form >
            {
                input.genres.length > 0 &&
                <div className="divGen">
                    <label>Remove Genre</label>
                    {input.genres.map(e =>

                        <button className="delbutton" onClick={() => handleDelete(e)}>{e} x</button>
                    )
                    }
                </div>
            }
            {
                input.image &&
                <div className="imgCreate">
                    <img src={input.image} alt="Not Found" />
                </div>
            }
            <div className="buttonsubmit">
                <button style={{ borderRadius: "5px", backgroundColor: "ActiveCaption" }} type="submit" onClick={e => handleSubmit(e)} >Create Videogame!</button>
            </div>
        </div >
    )
}

