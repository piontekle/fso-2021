import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import Button from './Button'

const Togglable = React.forwardRef(({
  buttonLabel,
  buttonTestId,
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
          testId={buttonTestId}
          onClick={toggleVisibility}
          label={buttonLabel}
        />
      }
      {visible &&
        <div>
          {children}
          <Button testId="cancel" onClick={toggleVisibility} label={cancelLabel} />
        </div>
      }
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string,
  inline: PropTypes.bool,
}

Togglable.defaultProps = {
  cancelLabel: 'cancel',
}

export default Togglable