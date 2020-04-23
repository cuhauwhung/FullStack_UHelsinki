import React from 'react'

import {
  Link
} from "react-router-dom"

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>  
        <li key={Number(anecdote.id)}>
          <Link to={`/about/${Number(anecdote.id)}`} >{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

export default AnecdoteList 