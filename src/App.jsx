import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddCity from "./Pages/AddCity/AddCity";
import CurrentCity from "./Pages/CurrentCity/CurrentCity";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/react-weather-wise" element={<Home />} />
        <Route path="/react-weather-wise/add-city" element={<AddCity />} />
        <Route path="/react-weather-wise/:city" element={<CurrentCity />} />
      </Routes>
    </>
  );
}

export default App;
