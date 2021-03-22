import React from 'react';

const TextBox = ({ 
  name,
  register,
  type,
}) => (
  <input
    name={name}
    ref={register}
    type={type}
  />
)

export default TextBox;
