import React from 'react'

const Button = ({ label, type, onClick }) => (
  <button type={type} onClick={onClick}>{label}</button>
)

export default Button
