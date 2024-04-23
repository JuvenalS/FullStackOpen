import { useState, useEffect } from "react";
import personService from "./services/phones";
import Error from "./components/Error";
import Success from "./components/Success";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      setErrorMessage(`${newName} is already added to the phonebook.`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    } else if (nameExists && !phoneExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((n) => n.name === newName);
        const changedNumber = { ...person, number: newNumber };
        personService
          .update(person.id, changedNumber)
          .then(() => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : changedNumber))
            );
            setSuccessMessage("Number updated successfully.");
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${person.name} has already been removed from server`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          });
      }
    } else {
      // if (newName.length < 3) {
      //   setErrorMessage("Name must be at least 3 characters long.");
      //   setTimeout(() => {
      //     setErrorMessage(null);
      //   }, 5000);
      //   return;
      // }

      const personObject = {
        name: newName,
        number: newNumber,
        id: `${persons.length + 1}`,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage("Person added successfully.");
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage("An error occurred while processing your request.");
          }
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
          setSuccessMessage("Person deleted successfully.");
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage("Error deleting person.");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
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
      <Error message={errorMessage} />
      <Success message={successMessage} />

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
