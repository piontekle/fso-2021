import React, { useState, useImperativeHandle } from 'react';

import Button from './Button';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      {!visible && 
        <Button
          onClick={toggleVisibility}
          label={props.buttonLabel}
        />
      }
      {visible &&
        <div>
          {props.children}
          <Button onClick={toggleVisibility} label="cancel" />
        </div>
      }
    </div>
  )
})

export default Togglable