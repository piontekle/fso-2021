import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Contact = ({ name, number }) => (
  <li>{name} {number}</li>
)
const Contacts = ({ contacts }) => (
  <ul>
    {
      contacts.map(contact => (
        <Contact
          key={contact.name}
          name={contact.name}
          number={contact.number}
        />
      ))
    }
  </ul>
)

const TextBox = ({ onChange, value }) => (
  <input onChange={onChange} value={value} />
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '39-44-532523' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const resetState = () => {
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const nameConflict = persons.find(person => person.name === newName);

    if (nameConflict) alert(`${newName} has already been added`);
    else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      resetState();
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <TextBox onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <TextBox onChange={handleNumberChange} value={newNumber} />
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
