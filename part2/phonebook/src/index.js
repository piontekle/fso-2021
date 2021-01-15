import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import ContactForm from './components/ContactForm';
import Contacts from './components/Contacts';
import Filter from './components/Filter';

const Header = ({ heading }) => <h2>{heading}</h2>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ filteredPersons, setFilteredPersons ] = useState([]);

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

  const handleSearch = (event) => {
    const searchName = event.target.value;
    setSearch(searchName);

    const filteredNames = persons.filter(person =>
      person.name.toLowerCase().startsWith(searchName.toLowerCase())
    );

    setFilteredPersons(filteredNames);
  }

  return (
    <div>
      <Header heading="Phonebook" />
      <Filter onSearch={handleSearch} value={search} />
      <Header heading="Add a new number" />
      <ContactForm
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        name={newName}
        onNumberChange={handleNumberChange}
        number={newNumber}
      />
      <Header heading="Numbers" />
      <Contacts contacts={search.length ? filteredPersons : persons} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
