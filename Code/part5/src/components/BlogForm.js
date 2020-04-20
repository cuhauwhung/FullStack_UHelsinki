import React, { useState } from 'react'

const BlogForm = ({ user, blogs, createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const addBlog = (event) => {

    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      userId: user.userId,
      id: blogs.length + 1
    }

    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setURL('')

  }

  return (

    <form onSubmit={addBlog}>
      <div>
        Title: {''}
        <input
          className='inputTitle'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className='authorBox'>
        Author: {''}
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div className='urlBox'>
        URL: {''}
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>

  )

}

export default BlogForm

