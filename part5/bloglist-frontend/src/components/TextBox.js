import React from 'react';

const TextBox = ({ 
  label,
  name,
  register,
  required,
  type,
}) => (
  <>
    <div>
      <label htmlFor={name}>
        {`${label}${required ? '*' : ''}`}
      </label>
    </div>
    <input
      name={name}
      ref={register}
      type={type}
    />
  </>
)

export default TextBox;
