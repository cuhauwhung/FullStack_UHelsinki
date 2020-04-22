import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'


const Anecdote = ({ anecdote, handleClick }) => {

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state =>
        state.sort((a, b) => {
            if (a.votes < b.votes) {
                return 1
            } else {
                return -1
            }
        })
    )

    return (
        <ul>
            {anecdotes.map((anecdote, i) =>
                <Anecdote
                    key={i}
                    anecdote={anecdote}
                    handleClick={() => dispatch(incrementVotes(anecdote.id))
                    }
                />
            )}
        </ul>
    )
}

export default AnecdoteList