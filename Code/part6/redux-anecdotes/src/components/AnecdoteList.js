import React from 'react'
import { connect } from 'react-redux'
import { incrementVotes } from '../reducers/AnecdoteReducer'

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

const AnecdoteList = (props) => {
    return (
        <ul>
            {props.anecdotes.map((anecdote, i) =>
                <Anecdote
                    key={i}
                    anecdote={anecdote}
                    handleClick={() => props.incrementVotes(anecdote.id)}
                />
            )}
        </ul>
    )
}

const mapStateToProps = (state) => {
    var anecdotes = state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))

    anecdotes = anecdotes.sort((a, b) => {
        if (a.votes < b.votes) {
            return 1
        } else {
            return -1
        }
    })

    return {
        anecdotes: anecdotes
    }
}

const mapDispatchToProps = {
    incrementVotes
}

const ConnectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
    )(AnecdoteList)

export default ConnectedAnecdotes