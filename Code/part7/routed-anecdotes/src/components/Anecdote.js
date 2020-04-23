import React from 'react'
import {
    useParams
} from "react-router-dom"

const Anecdote = ({ anecdote }) => {

    return anecdote ? (
        <div>
            <h1>
                {anecdote.content} by {anecdote.author}
            </h1>
            has {anecdote.votes} votes
        </div>
    ) : null
}

export default Anecdote