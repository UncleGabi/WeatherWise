import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { WiThermometer, WiSunrise, WiSunset } from "weather-icons-react";
import {
  saveWeatherData,
  selectAllData,
  selectCurrentCity,
} from "../../features/citiesSlice";

import "./CurrentCity.scss";

function CurrentCity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cityName = location.pathname.slice(1).replaceAll("+", " ");
  const weatherData = useSelector(selectCurrentCity(cityName));
  const { isLoading } = useSelector(selectAllData);

  const [currentTime, setCurrentTime] = useState(weatherData?.time || 0);

  useEffect(() => {
    fetchWeatherData();

    const timeInterval = setInterval(
      () => setCurrentTime((currTime) => currTime + 30),
      30000
    );

    return () => clearInterval(timeInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWeatherData = async () => {
    const currentData = await dispatch(saveWeatherData(cityName)).unwrap();
    setCurrentTime(currentData?.time);
  };

  const convertTime = (time) =>
    moment.utc(time, "X").add(weatherData?.timeZone, "seconds").format("HH:mm");

  return (
    <div className="current-city-page">
      <button
        className="back-btn"
        onClick={() => navigate("/react-weather-wise")}
      >
        &lt;
      </button>
      {weatherData && !isLoading && (
        <div className="content">
          <div className="time">
            <div>{convertTime(currentTime).split(":")[0]}</div>
            <div>{convertTime(currentTime).split(":")[1]}</div>
          </div>
          <div className="city">{weatherData?.city}</div>
          <img src={weatherData?.icon} alt={weatherData?.desc} />
          <div className="description">{weatherData?.description}</div>
          <div className="weather-data">
            <WiThermometer className="icon" size={30} />
            <span>{weatherData?.temperature} °C</span>
          </div>
          <div className="weather-data">
            <WiSunrise className="icon" size={30} />
            <span>{convertTime(weatherData?.sunrise)}</span>
          </div>
          <div className="weather-data">
            <WiSunset className="icon" size={30} />
            <span>{convertTime(weatherData?.sunset)}</span>
          </div>
        </div>
      )}
      {!weatherData && !isLoading && (
        <div className="not-found">
          <div>404</div>
          <div>The given city cannot be found</div>
          <button onClick={() => navigate("/react-weather-wise")}>Back</button>
        </div>
      )}
      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
}

export default CurrentCity;
