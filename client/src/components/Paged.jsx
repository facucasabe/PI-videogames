import React from "react";

export default function Paged({ gamesPerPage, allGames, paged }) {
    const pageNumbers = []

    for (let i = 1; i < Math.ceil(allGames / gamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="paged">
                {pageNumbers &&
                    pageNumbers.map(number => {
                        return (
                            <li className="number" key={number}>
                                <a onClick={() => paged(number)}>{number}</a>
                            </li>
                        )
                    })}
            </ul>
        </nav>
    )
}