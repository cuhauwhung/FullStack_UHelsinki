import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import UserInfo from './components/UserInfo'
import blogService from './services/blogService'
import loginService from './services/loginService'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Utils from './Utils/utils'

const App = () => {

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(Utils.sortBlogs(initialBlogs))
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = (blogObject) => {

    try {

      blogFormRef.current.toggleVisibility()
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
        })

      setSuccessMessage('Successfully Added New Blog')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 10000)

    } catch (exception) {

      setErrorMessage('Error Adding Blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)

    }
  }

  const handleLogin = async (userObject) => {

    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLike = (blogObject) => {

    const modifiedBlogObject = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes + 1,
      user: blogObject.user.id,
      id: blogObject.id
    }

    const updatedBlogs = blogs.filter(blog => blog.id !== blogObject.id)
    blogService.update(modifiedBlogObject)
    setBlogs(Utils.sortBlogs(updatedBlogs.concat(blogObject)))
  }

  const handleRemove = (blogObject) => {

    if (window.confirm(`You're about to delete ${blogObject.title}`)) {
      const updatedBlogs = blogs.filter(blog => blog.id !== blogObject.id)
      blogService.deleteBlog(blogObject)
      setBlogs(Utils.sortBlogs(updatedBlogs))
    }
  }

  return (
    <div>

      {user === null ?
        <div>
          <h1>Login to application</h1>
          <Notification message={successMessage} msg_type={'success'} />
          <Notification message={errorMessage} msg_type={'error'} />
          <LoginForm handleLogin={handleLogin}
          />
        </div>
        :
        <div>
          <h1>Blogs</h1>
          <Notification message={successMessage} msg_type={'success'} />
          <Notification message={errorMessage} msg_type={'error'} />
          <UserInfo user={user} handleLogout={handleLogout} />
          <h1>Create new</h1>

          <Togglable buttonLabel="create" ref={blogFormRef}>
            <BlogForm user={user} blogs={blogs} createBlog={createBlog} />
          </Togglable>

          <Blogs blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} />
        </div>

      }

    </div>
  )
}

export default App