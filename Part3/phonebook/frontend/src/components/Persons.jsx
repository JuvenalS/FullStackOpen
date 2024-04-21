import Content from "./Content";

const Persons = ({ filteredPersons, handleDeletePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <Content
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          del={handleDeletePerson}
        />
      ))}
    </div>
  );
};

export default Persons;
