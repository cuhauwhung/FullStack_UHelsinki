import React, { useState } from 'react'
import { useField } from '../hooks/index'

const AnecdoteForm = (props) => {

  const { reset: contentReset, ...content } = useField('text')
  const { reset: authorReset, ...author } = useField('text')
  const { reset: infoReset, ...info } = useField('text')

  const resetForm = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    resetForm()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
            <input {...content} />
        </div>
        <div>
          author
            <input {...author} />
        </div>
        <div>
          url for more info
            <input {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={resetForm}> reset </button>
    </div>
  )

}

export default AnecdoteForm