import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import UserInfo from './components/UserInfo'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
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

  const addBlog = (event) => {
    
    event.preventDefault()
    try {

      const blogObject = {
        title: title,
        author: author,
        url: url,
        userId: user.userId,
        id: blogs.length + 1
      }
  
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setTitle('')
          setAuthor('')
          setURL('')
        })
      
        setSuccessMessage('Success Adding Blog')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)

    } catch (exception) {
      setErrorMessage('Error Adding Blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  return (
    <div>

      {user === null ?
        <div>
          <h1>Login to application</h1>
          <Notification message={successMessage} msg_type={"success"}/>
          <Notification message={errorMessage} msg_type={"error"}/>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
        :
        <div>
          <h1>Blogs</h1>
          <Notification message={successMessage} msg_type={"success"}/>
          <Notification message={errorMessage} msg_type={"error"}/>
          <UserInfo user={user} handleLogout={handleLogout} />
          <h1>Create new</h1>
          
          <BlogForm title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setURL={setURL} addBlog={addBlog} /> 
          <Blogs blogs={blogs} />
        </div>

      }

    </div>
  )
}

export default App