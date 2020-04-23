import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/AnecdoteReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
    }

    return (
        <form onSubmit={addAnecdote}>
            <div><input name='anecdote' /></div>
            <button>create</button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = {
    createAnecdote
}

const ConnectedAnecdoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteForm)

export default ConnectedAnecdoteForm