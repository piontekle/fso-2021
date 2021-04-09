import React from 'react'

const Button = ({ label, type, onClick, testId }) => (
  <button data-testid={testId} type={type} onClick={onClick}>
    {label}
  </button>
)

export default Button
