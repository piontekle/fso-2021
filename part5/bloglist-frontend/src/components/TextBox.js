import React from 'react'

const TextBox = ({
  label,
  name,
  register,
  required,
  testId,
  type,
}) => (
  <>
    <div>
      <label htmlFor={name}>
        {`${label}${required ? '*' : ''}`}
      </label>
    </div>
    <input
      data-testid={testId}
      name={name}
      ref={register}
      type={type}
    />
  </>
)

export default TextBox
