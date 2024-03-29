const CountryList = ({ countries, handleShowButtonClick }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => handleShowButtonClick(country.name.common)}>
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
