import React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { getByName } from "../actions/actions"

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getByName(name))
    }

    return (
        <div>
            <input className="searchbar" type="text" placeholder="Search by Name" onChange={(e) => handleInputChange(e)} />
            <button className="searchbutton" type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div >
    )
}