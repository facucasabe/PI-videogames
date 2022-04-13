import React from "react";
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="notfound">
            <Link to="/home">
                <button className="button">Go Back</button>
            </Link>
            <p>Not Found</p>
        </div>
    )
}