import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

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

    const handleVote = (anecdote) => {
        dispatch(incrementVotes(anecdote.id))
        dispatch(setNotification(`you voted "${anecdote.content.substring(0, 20)}..."`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    var anecdotes = useSelector(state => {
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
    })

    anecdotes = anecdotes.sort((a, b) => {
        if (a.votes < b.votes) {
            return 1
        } else {
            return -1
        }
    })

    console.log(anecdotes)

    return (
        <ul>
            {anecdotes.map((anecdote, i) =>
                <Anecdote
                    key={i}
                    anecdote={anecdote}
                    handleClick={() => handleVote(anecdote)}
                />
            )}
        </ul>
    )
}

export default AnecdoteList