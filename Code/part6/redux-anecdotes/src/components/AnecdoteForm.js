import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/AnecdoteReducer'
import { setNotification, clearNotification } from '../reducers/NotificationReducer'
import anecdoteService from '../services/AnecdoteService'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    )
}

export default AnecdoteForm