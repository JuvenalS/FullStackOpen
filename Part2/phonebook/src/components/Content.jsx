const Content = ({ name, number, id, del }) => {
  const label = "delete";

  return (
    <p>
      {name} {number} <button onClick={() => del(id)}>{label}</button>
    </p>
  );
};

export default Content;
