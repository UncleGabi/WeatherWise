import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveWeatherData, selectCityNames } from "../../features/citiesSlice";

import "./Home.scss";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cityNames = useSelector(selectCityNames);

  useEffect(() => {
    const success = async (position) => {
      const { latitude, longitude } = position.coords;
      const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";

      const location = await axios.get(url, {
        params: {
          latitude: latitude,
          longitude: longitude,
        },
      });

      const { city } = location.data;

      await dispatch(saveWeatherData(city));
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    navigate("/add-city");
  };

  const renderSelectedCities = () => {
    return cityNames.slice(0, 8).map((city) => {
      const cityName = city?.replaceAll(" ", "+");

      return (
        <div
          key={city}
          className="list-item"
          onClick={() => navigate(`/${cityName}`)}
        >
          {city}
        </div>
      );
    });
  };

  return (
    <div className="home-page">
      <div className="add" onClick={handleClick}>
        +
      </div>
      {renderSelectedCities()}
    </div>
  );
}

export default Home;
