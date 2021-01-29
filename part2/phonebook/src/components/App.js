import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ContactForm from './ContactForm';
import Contacts from './Contacts';
import Filter from './Filter';

const Header = ({ heading }) => <h2>{heading}</h2>

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ filteredPersons, setFilteredPersons ] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data);
      });
  }, []);

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
      const newPerson = { name: newName, number: newNumber }
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(res => {
          setPersons(persons.concat(res.data));
          resetState();
        })
        .catch(err => console.log(err))
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

export default App;
