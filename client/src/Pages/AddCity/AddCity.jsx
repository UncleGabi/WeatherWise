/* eslint-disable react-hooks/rules-of-hooks */
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchWeatherData } from "../../features/thunkFunctions";
import {
  addCapitals,
  selectAllCapitals,
  selectCityNames,
} from "../../features/citiesSlice";

import "./AddCity.scss";
import FilteredCapitals from "../../components/FilteredCapitals/FilteredCapitals";

function AddCity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const existingCityNames = useSelector(selectCityNames);
  const capitals =
    location.state?.allCapitals || useSelector(selectAllCapitals);

  const [searchValue, setSearchValue] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const isAddedCity = useRef(false);

  const searchedCities = capitals?.filter((capital) => {
    const regex = new RegExp(`${searchValue}`, "gi");
    return capital.match(regex) && !existingCityNames.includes(capital);
  });

  useEffect(() => {
    if (!capitals.length) {
      fetchCapitals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchedCities?.length > 1) {
      setSelectedCity("");
    }
  }, [searchedCities]);

  useEffect(() => {
    isAddedCity.current = existingCityNames.includes(selectedCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  const fetchCapitals = async () => {
    const { data } = await axios.get("http://localhost:8000/capitals");
    await dispatch(addCapitals(data));
  };

  const saveWeatherData = async (cityName) => {
    return await dispatch(fetchWeatherData(cityName)).unwrap();
  };

  const handleBackNavigation = () => {
    navigate("/react-weather-wise");
  };

  const handleSave = async () => {
    await saveWeatherData(selectedCity);
    navigate("/react-weather-wise");
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
          placeholder="Enter city..."
          autoFocus
        />
        <span className="down-caret">&lt;</span>
        {searchValue && (
          <FilteredCapitals
            searchedCities={searchedCities}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setSelectedCity={setSelectedCity}
          />
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
