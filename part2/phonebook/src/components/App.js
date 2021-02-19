import React, { useState, useEffect } from 'react';

import personsService from '../services/persons';

import ContactForm from './ContactForm';
import Contacts from './Contacts';
import Filter from './Filter';
import Notification from './Notification';

const Header = ({ heading }) => <h2>{heading}</h2>

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ filteredPersons, setFilteredPersons ] = useState([]);
  const [ notificationMsg, setNotificationMsg ] = useState(null);
  const [ notificationType, setNotificationType ] = useState('success');

  useEffect(() => {
    personsService.getAll()
      .then(persons => {
        setPersons(persons);
      });
  }, []);

  const resetState = () => {
    setNewName('');
    setNewNumber('');
  }

  const resetNotification = () => {
    setNotificationMsg(null);
  }

  const setNotification = (type, message) => {
    setNotificationMsg(message);
    setNotificationType(type);
  }

  const handleNameChange = event => {
    setNewName(event.target.value);
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    const personExists = persons.find(person =>
      person.name.toLowerCase() === newName.toLowerCase()
    );

    if (
      personExists &&
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    ) {
      const updatedPerson = {...personExists, number: newNumber };
      personsService.update(updatedPerson)
        .then(updated => {
          const newPersons = persons.filter(person => person.id !== updated.id)
          setPersons(newPersons.concat(updated))
          setNotification('success', `${updated.name} successfully updated`);
        })
        .catch(err => {
          console.log(err)
          setNotification('error', err.response.data.error);
        })
    } else {
      const newPerson = { name: newName, number: newNumber };
      personsService.create(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
          setNotification('success', `${person.name} successfully added`);
        })
        .catch(err => {
          console.log(err.response)
          setNotification('error', err.response.data.error);
        })
    }

    resetState();
    setTimeout(() => resetNotification(), 5000);
  }

  const handleSearch = event => {
    const searchName = event.target.value;
    setSearch(searchName);

    const filteredNames = persons.filter(person =>
      person.name.toLowerCase().startsWith(searchName.toLowerCase())
    );

    setFilteredPersons(filteredNames);
  }

  const handleDelete = contact => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      personsService.remove(contact.id)
        .then(res => {
          const newPersons = persons.filter(person => person.id !== contact.id);
          setPersons(newPersons);
          setNotification('success', `${contact.name} successfully removed`);
        })
        .catch(err => {
          setNotification('error', err.response.data.error);
          console.log(err)
        });
    }

    setTimeout(() => resetNotification(), 5000);
  }

  return (
    <div>
      <Header heading="Phonebook" />
      <Filter onSearch={handleSearch} value={search} />
      <Header heading="Add a new number" />
      <Notification type={notificationType} message={notificationMsg} />
      <ContactForm
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        name={newName}
        onNumberChange={handleNumberChange}
        number={newNumber}
      />
      <Header heading="Numbers" />
      <Contacts
        contacts={search.length ? filteredPersons : persons}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App;
