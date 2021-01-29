import React from 'react';

import Button from './Button';

const Contact = ({ name, number }) => (
  <li>{name} {number}</li>
)
const Contacts = ({ contacts, handleDelete }) => (
  <ul>
    { contacts.length ? (
        contacts.map(contact => (
          <React.Fragment key={contact.id}>
            <Contact
              name={contact.name}
              number={contact.number}
            />
            <Button label="delete" onClick={() => handleDelete(contact)}  />
          </React.Fragment>
        ))
      ) : <div>No contacts found</div>
    }
  </ul>
)

export default Contacts;
