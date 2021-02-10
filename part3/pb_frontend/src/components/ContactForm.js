import React from 'react';

import TextBox from './TextBox';
import Button from './Button';

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
      <Button type="submit" label="add" />
    </div>
  </form>
)

export default ContactForm;
