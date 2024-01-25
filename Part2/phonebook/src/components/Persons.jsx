import Content from "./Content";

const Persons = ({ filteredPersons }) => {

    return (
        <div>
          {filteredPersons.map((person) => (
            <Content key={person.id} name={person.name} number={person.number} />
          ))}
      </div>
    )
}

export default Persons;