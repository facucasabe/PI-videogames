import React from "react"
import { Link } from "react-router-dom"

export default function LandingPage() {
    return (

        <div className="landing">
            <h1>START GAME</h1>
            <Link to="/home">
                <button>log in</button>
            </Link>

        </div>

    )
}