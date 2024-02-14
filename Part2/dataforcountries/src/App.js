import { useEffect, useState } from "react";
import axios from "axios";

import WeatherInfo from "./components/WatherInfo";
import SearchInput from "./components/SearchInput";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

const baseURL = "https://restcountries.com/v3.1/all";

const App = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showCountries, setShowCountries] = useState(false);
  const [singleCountry, setSingleCountry] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          setCountries(response.data);
          setFilteredCountries(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const handleCountrySearch = (event) => {
    const searchTerm = event.target.value;
    setSearchFilter(searchTerm);
    setShowCountries(false);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);

    if (searchTerm === "") {
      setSingleCountry(null);
    } else if (filtered.length > 10) {
      setShowCountries(false);
      setSingleCountry(null);
    } else if (filtered.length > 1 && filtered.length <= 10) {
      setShowCountries(true);
      setSingleCountry(null);
    } else if (filtered.length === 1) {
      setShowCountries(false);
      setSingleCountry(filtered[0]);
    }
  };

  if (!countries || countries.length === 0) return <div>Loading...</div>;

  const handleShowButtonClick = (countryName) => {
    setSearchFilter(countryName);
    const selectedCountry = countries.find(
      (country) => country.name.common === countryName
    );
    setSingleCountry(selectedCountry);
  };

  return (
    <div>
      <h1>Find countries:</h1>
      <SearchInput value={searchFilter} onChange={handleCountrySearch} />
      {filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {showCountries && (
        <CountryList
          countries={filteredCountries}
          handleShowButtonClick={handleShowButtonClick}
        />
      )}
      {singleCountry && (
        <div>
          <CountryDetails country={singleCountry} />
          <WeatherInfo capital={singleCountry.capital} />
        </div>
      )}
    </div>
  );
};

export default App;
