import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import SelectedCities from "../../components/SelectedCities/SelectedCities";
import axios from "axios";
import {
  selectAllCapitals,
  selectCityNames,
  updateWeatherData,
} from "../../features/citiesSlice";
import { fetchWeatherData, fetchCapitals } from "../../features/thunkFunctions";

import "./Home.scss";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCapitals = useSelector(selectAllCapitals);
  const cityNames = useSelector(selectCityNames);

  const [cityToDelete, setCityToDelete] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    httpGetAllData();
    fetchCapitalNames();

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
      await dispatch(fetchWeatherData(city));
    };

    if (navigator.geolocation && !cityNames.length) {
      navigator.geolocation.getCurrentPosition(success, console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCapitalNames = async () => {
    await dispatch(fetchCapitals()).unwrap();
  };

  const httpGetAllData = async () => {
    const { data } = await axios.get("http://localhost:8000/weather-data");
    dispatch(updateWeatherData(data));
  };

  const handleClick = () => {
    navigate("/react-weather-wise/add-city", { state: { allCapitals } });
  };

  return (
    <div className="home-page">
      <div className="add" onClick={handleClick}>
        +
      </div>
      <SelectedCities
        cityNames={cityNames}
        navigate={navigate}
        setCityToDelete={setCityToDelete}
        setIsOpenModal={setIsOpenModal}
      />
      <DeleteModal
        city={cityToDelete}
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
      />
    </div>
  );
}

export default Home;
