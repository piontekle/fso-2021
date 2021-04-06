import React from 'react'

const Notification = ({ type, message }) => {
  const styles = {
    'error': {
      color: 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    },
    'smError': {
      color: 'red',
      background: 'lightgrey',
      fontSize: '10px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '5px',
      marginBottom: '5px',
      width: '300px',
    },
    'success': {
      color: 'green',
      background: 'lightgreen',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    }
  }

  if (message === null) {
    return null
  }

  return (
    <div data-testid={type} style={styles[type]}>
      {message}
    </div>
  )
}

export default Notification
