const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>Total de exercícios {props.total}</p>
    </div>
  );
};

const App = () => {
  const course = "Desenvolvimento de aplicação Half Stack";
  const parts = [
    { name: "Fundamentos da biblioteca React", exercises: 10 },
    { name: "Usando props para passar dados", exercises: 7 },
    { name: "Estado de um componente", exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total total={parts.reduce((total, part) => total + part.exercises, 0)} />
    </div>
  );
};

export default App;
