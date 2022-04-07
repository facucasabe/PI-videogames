import React from "react";
import { Link } from "react-router-dom";
// import Details from "./Detail";
// import { useParams } from "react-router-dom";


export default function Card({ name, image, genres, id }) {
    return (
        <Link to={`/videogame/${id}`}>
            < div className="Card" >
                <h2>{name}</h2>
                <h4>{genres + " "}</h4>
                <img src={image} alt="Not Found" border="5px" className="center" />
            </div >
        </Link>
    )
}