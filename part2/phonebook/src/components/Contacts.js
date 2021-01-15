import React from 'react';

const Contact = ({ name, number }) => (
  <li>{name} {number}</li>
)
const Contacts = ({ contacts }) => (
  <ul>
    { contacts.length ? (
        contacts.map(contact => (
          <Contact
            key={contact.name}
            name={contact.name}
            number={contact.number}
          />
        ))
      ) : <div>No contacts found</div>
    }
  </ul>
)

export default Contacts;
