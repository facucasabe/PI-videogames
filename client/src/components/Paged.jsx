import React from "react";


export default function Paged({ gamesPerPage, allGames, paged, currentPage }) {
    const pageNumbers = []

    function handlePrevious(e) {
        e.preventDefault()
        paged(currentPage - 1)
    }

    function handleNext(e) {
        e.preventDefault()
        paged(currentPage + 1)
    }

    for (let i = 1; i < Math.ceil(allGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className="paged">

            <ul>
                <li><button disabled={currentPage === pageNumbers[0] || pageNumbers.length === 0} onClick={e => handlePrevious(e)}>Previous</button></li>
                {pageNumbers &&
                    pageNumbers.map(number => {
                        return (

                            <li className="number" key={number}>

                                <button onClick={() => paged(number)}>{number}</button>
                            </li>
                        )
                    })}

                <li><button disabled={currentPage === pageNumbers[pageNumbers.length - 1] || pageNumbers.length === 0} onClick={e => handleNext(e)}>Next</button></li>
            </ul>
            <br />
            <br />
            <br />

        </nav>
    )
}