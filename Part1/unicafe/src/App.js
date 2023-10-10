import { useState } from "react";

const Header = () => <h1>give feedback</h1>;

const Botao = (props) => (
  <button onClick={props.handleClique}>{props.texto}</button>
);

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const Statistics = (props) => {
  const { good, neutral, bad, total, average, positivePercentage } = props;

  if (total === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average.toFixed(2)} />
          <StatisticLine
            text="positive"
            value={positivePercentage.toFixed(2)}
          />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleCliqueGood = () => {
    setGood(good + 1);
  };

  const handleCliqueNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleCliqueBad = () => {
    setBad(bad + 1);
  };

  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positivePercentage = (good / total) * 100 || 0;

  return (
    <div>
      <Header />
      <Botao handleClique={handleCliqueGood} texto="good" />
      <Botao handleClique={handleCliqueNeutral} texto="neutral" />
      <Botao handleClique={handleCliqueBad} texto="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  );
};

export default App;
