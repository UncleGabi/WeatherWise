import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AddCity from "./Pages/AddCity/AddCity";
import CurrentCity from "./Pages/CurrentCity/CurrentCity";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-city" element={<AddCity />} />
        <Route path="/:city" element={<CurrentCity />} />
      </Routes>
    </>
  );
}

export default App;
