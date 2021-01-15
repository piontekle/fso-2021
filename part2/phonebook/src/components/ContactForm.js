import React from 'react';

import TextBox from './TextBox';

const ContactForm = ({
  onSubmit,
  onNameChange,
  name,
  onNumberChange,
  number
}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <TextBox onChange={onNameChange} value={name} />
    </div>
    <div>
      number: <TextBox onChange={onNumberChange} value={number} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default ContactForm;
