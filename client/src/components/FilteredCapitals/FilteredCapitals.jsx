function FilteredCapitals(props) {
  const { searchedCities, searchValue, setSearchValue, setSelectedCity } =
    props;

  return (
    <div className="matches">
      {searchedCities?.slice(0, 8).map((city, index) => {
        const cityChars = city.split("");
        const highlightedChars = cityChars.map((char, i) => {
          const isMatch = searchValue
            ?.toLowerCase()
            .includes(char.toLowerCase());
          return (
            <span key={i} className={isMatch ? "highlighted" : ""}>
              {char}
            </span>
          );
        });

        return (
          <div
            key={index}
            className="matches-item"
            onClick={() => {
              setSearchValue(city);
              setSelectedCity(city);
            }}
          >
            {highlightedChars}
          </div>
        );
      })}
    </div>
  );
}

export default FilteredCapitals;
