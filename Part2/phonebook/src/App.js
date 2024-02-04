import { useState, useEffect } from "react";
import personService from "./services/phones";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPhones) => {
      setPersons(initialPhones);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const nameLowerCase = newName.toLowerCase();
    const phoneExists = persons.find((obj) => obj.number === newNumber);
    const nameExists = persons.find(
      (obj) => obj.name.toLowerCase() === nameLowerCase
    );

    if (nameExists && phoneExists) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else if (nameExists && !phoneExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((n) => n.name === newName);
        console.log(person);
        const changedNumber = { ...person, number: newNumber };
        personService.update(person.id, changedNumber).then(() => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : changedNumber))
          );
          setNewName("");
          setNewNumber("");
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: `${persons.length + 1}`,
      };

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleDeletePerson = (id) => {
    const person = persons.find((n) => n.id === id);

    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting person:", error);
        });
    }
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePersonNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    console.log(event.target.value);
    const searchTerm = event.target.value;
    setSearchName(searchTerm);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={searchName} onChange={handleSearchNameChange} />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handlePersonNumberChange={handlePersonNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        filteredPersons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
