import React from "react"
import { Link } from "react-router-dom"

export default function LandingPage() {
    return (

        <div className="landing">
            {/* <h1>START GAME</h1> */}
            <h1 className="logo">
                <span>S</span>
                <span>T</span>
                <span>A</span>
                <span>R</span>
                <span>T</span>
                <span> </span>
                <span>G</span>
                <span>A</span>
                <span>M</span>
                <span>E</span>
            </h1>
            <Link to="/home">
                <button className="button">log in</button>
            </Link>
            <br />
            <img src="https://thumbs.gfycat.com/CheerfulAntiqueDassie-max-1mb.gif" className="landingimg" alt="Not Found" />
        </div >

    )
}