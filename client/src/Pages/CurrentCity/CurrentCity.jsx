import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { WiThermometer, WiSunrise, WiSunset } from "weather-icons-react";
import { selectAllData } from "../../features/citiesSlice";

import "./CurrentCity.scss";
import { fetchWeatherData } from "../../features/thunkFunctions";

function CurrentCity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cityName = location.pathname.split("/")[2].replaceAll("+", " ");
  const { isLoading } = useSelector(selectAllData);
  
  const [currentWeatherData, setCurrentWeatherData] = useState({});
  const [currentTime, setCurrentTime] = useState(currentWeatherData?.time || 0);

  useEffect(() => {
    saveWeatherData();

    const timeInterval = setInterval(
      () => setCurrentTime((currTime) => currTime + 30),
      30000
    );

    return () => clearInterval(timeInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveWeatherData = async () => {
    const currentData = await dispatch(fetchWeatherData(cityName)).unwrap();
    setCurrentWeatherData(currentData);
    setCurrentTime(currentData?.time);
  };

  const convertTime = (time) =>
    moment
      .utc(time, "X")
      .add(currentWeatherData?.timeZone, "seconds")
      .format("HH:mm");

  return (
    <div className="current-city-page">
      <button
        className="back-btn"
        onClick={() => navigate("/react-weather-wise")}
      >
        &lt;
      </button>
      {currentWeatherData && !isLoading && (
        <div className="content">
          <div className="time">
            <div>{convertTime(currentTime).split(":")[0]}</div>
            <div>{convertTime(currentTime).split(":")[1]}</div>
          </div>
          <div className="city">{currentWeatherData?.city}</div>
          <img src={currentWeatherData?.icon} alt={currentWeatherData?.desc} />
          <div className="description">{currentWeatherData?.description}</div>
          <div className="weather-data">
            <WiThermometer className="icon" size={30} />
            <span>{currentWeatherData?.temperature} °C</span>
          </div>
          <div className="weather-data">
            <WiSunrise className="icon" size={30} />
            <span>{convertTime(currentWeatherData?.sunrise)}</span>
          </div>
          <div className="weather-data">
            <WiSunset className="icon" size={30} />
            <span>{convertTime(currentWeatherData?.sunset)}</span>
          </div>
        </div>
      )}
      {!currentWeatherData && (
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
