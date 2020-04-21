import React from 'react'

const Notification = ({ message, msg_type }) => {

  if (message === null) { return null }
  if (msg_type === 'error') {
    return (
      <div className='error'>
        {message}
      </div>
    )
  } else if (msg_type === 'success') {
    return (
      <div className='success'>
        {message}
      </div>
    )
  }
}

export default Notification
