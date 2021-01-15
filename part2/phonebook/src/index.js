import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Contact = ({ contact }) => (
  <li>{contact.name}</li>
)
const Contacts = ({ contacts }) => (
  <ul>
    {
      contacts.map(contact => (
        <Contact
          key={contact.name}
          contact={contact}
        />
      ))
    }
  </ul>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setPersons(persons.concat({ name: newName}));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Contacts contacts={persons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
