import { useState } from "react";

const Header = () => {
  return <h1>Anecdote of the day</h1>;
};

const Anecdote = (props) => {
  return <p>{props.texto}</p>;
};

const Vote = (props) => {
  return <p>has {props.votes} votes</p>;
};

const Botao = (props) => (
  <button onClick={props.handleClique}>{props.texto}</button>
);

const Footer = ({ anecdotes, votes }) => {
  const mostVotedIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {votes[mostVotedIndex] > 0 ? (
        <div>
          <Anecdote texto={anecdotes[mostVotedIndex]} />
          <Vote votes={votes[mostVotedIndex]} />
        </div>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "Se fazer algo dói, faça isso com mais frequência.",
    "Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!",
    "Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.",
    "Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.",
    "Otimização prematura é a raiz de todo o mal.",
    "Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.",
    "Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.",
    "A única maneira de ir rápido é ir bem.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const min = 0;
  const max = anecdotes.length;

  const handleNumberRandom = () => {
    const randomIndex = Math.floor(Math.random() * (max - min) + min);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const mostVotedIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Header />
      <Anecdote texto={anecdotes[selected]} />
      <Vote votes={votes[selected]} />
      <Botao handleClique={handleVote} texto="vote" />
      <Botao handleClique={handleNumberRandom} texto="next anecdotes" />
      <Footer anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
