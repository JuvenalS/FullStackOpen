const SearchInput = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder="Search by country name..."
    />
  );
};

export default SearchInput;
