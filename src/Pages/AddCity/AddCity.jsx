import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { capitals } from "../../assets/capitals";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCityNames, saveWeatherData } from "../../features/citiesSlice";

import "./AddCity.scss";

function AddCity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingCityNames = useSelector(selectCityNames);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const isAddedCity = useRef(false);

  const searchedCities = capitals.filter((capital) => {
    const regex = new RegExp(`${searchValue}`, "gi");
    return capital.match(regex) && !existingCityNames.includes(capital);
  });

  useEffect(() => {
    if (searchedCities.length > 1) {
      setSelectedCity("");
    }
  }, [searchedCities]);

  useEffect(() => {
    isAddedCity.current = existingCityNames.includes(selectedCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  const fetchWeatherData = async (cityName) => {
    return await dispatch(saveWeatherData(cityName)).unwrap();
  };

  const handleBackNavigation = () => {
    navigate("/");
  };

  const renderMatches = (cities) =>
    cities.slice(0, 8).map((city, index) => {
      const cityChars = city.split("");
      const highlightedChars = cityChars.map((char, i) => {
        const isMatch = searchValue?.toLowerCase().includes(char.toLowerCase());
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
    });

  const handleSave = async () => {
    await fetchWeatherData(selectedCity);
    navigate("/");
  };

  return (
    <div className="add-city-page">
      <button className="back-btn" onClick={handleBackNavigation}>
        &lt;
      </button>
      <div className="search-box">
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          autoFocus
        />
        <span className="down-caret">&lt;</span>
        {searchValue && (
          <div className="matches">{renderMatches(searchedCities)}</div>
        )}
        {selectedCity && (
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        )}
      </div>
    </div>
  );
}

export default AddCity;
