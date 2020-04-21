import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {

    event.preventDefault()

    const userObject = {
      username: username,
      password: password
    }

    handleLogin(userObject)

    setUsername('')
    setPassword('')

  }

  return (
    <form onSubmit={login}>
      <div className="username">
                Username: {''}
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="password">
                Password: {''}
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm

