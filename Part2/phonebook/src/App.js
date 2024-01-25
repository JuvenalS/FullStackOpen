import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = ()  => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040-123456', id: 1 },
    { name: 'Ada Lovelace', number:'39-44-5323523', id: 2 },
    { name: 'Dan Abromov', number:'12-43-23445', id: 3 },
    { name: 'Mary Poppendieck', number:'39-236423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const addName = (event) => {

    event.preventDefault();

    const nameLowerCase = newName.toLowerCase();
    const nameExists = persons.find(obj => obj.name.toLowerCase() === nameLowerCase);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  };

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  };

  const handlePersonNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    console.log(event.target.value)
    const searchTerm = event.target.value;
    setSearchName(searchTerm);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={searchName} onChange={handleSearchNameChange}/>

      <h2>Add a new</h2>
      <PersonForm
      addName={addName}
      newName={newName}
      handlePersonChange={handlePersonChange}
      newNumber={newNumber}
      handlePersonNumberChange={handlePersonNumberChange}
      />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App;
