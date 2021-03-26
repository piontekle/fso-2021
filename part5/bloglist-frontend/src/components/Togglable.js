import React, { useState, useImperativeHandle } from 'react';

import Button from './Button';

const Togglable = React.forwardRef(({
  buttonLabel,
  cancelLabel,
  children,
  inline,
}, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleStyle = inline ?
    { 
      display: 'inline',
      marginTop: 10,
      marginLeft: 10
    } : {}

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div style={toggleStyle}>
      {!visible && 
        <Button
          onClick={toggleVisibility}
          label={buttonLabel}
        />
      }
      {visible &&
        <div>
          {children}
          <Button onClick={toggleVisibility} label={cancelLabel ? cancelLabel : 'cancel'} />
        </div>
      }
    </div>
  )
})

export default Togglable