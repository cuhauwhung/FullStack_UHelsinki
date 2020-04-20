import React, { useState } from 'react'

const BlogExtended = ({ blog, handleLike, handleRemove }) => {

  const addLike = (event) => {

    event.preventDefault()
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user,
      id: blog.id
    }

    handleLike(newBlog)

  }

  const removeBlog = (event) => {

    event.preventDefault()
    handleRemove(blog)

  }

  return (
    <div>
      {blog.url}
      <br></br>
      {blog.likes} <button onClick ={addLike}> like </button>
      <br></br>
      {blog.author}
      <button onClick={removeBlog}> remove </button>
    </div>
  )
}

const Blog = ({ blog, handleLike, handleRemove }) => {

  const [isExtended, setIsExtended] = useState(false)
  const showWhenVisible = { display: isExtended ? '' : 'none' }

  const toggleIsExtended = () => {
    setIsExtended(!isExtended)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {' '}
      <button onClick={toggleIsExtended}> {isExtended? 'hide' : 'show'} </button>
      <div style={showWhenVisible}>
        <BlogExtended blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>
      </div>
    </div>
  )
}

const Blogs = ({ blogs, handleLike, handleRemove }) => {

  return (
    <div>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove}/>
      )}
    </div>
  )
}

export default { Blogs }
