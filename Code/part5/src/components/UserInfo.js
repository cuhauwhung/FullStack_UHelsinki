import React from 'react'

const UserInfo = ({ user, handleLogout }) => {
  const username = user.name

  return (
    <div>
      {username} logged in {' '}
      <button
        onClick={handleLogout}
      >
                logout
      </button>
    </div>
  )
}

export default UserInfo
