import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import "./SelectedCities.scss";

function SelectedCities(props) {
  const { cityNames, navigate, setCityToDelete, setIsOpenModal } = props;

  return (
    <div className="selected-cities-list">
      {cityNames.slice(0, 8).map((city) => {
        const cityName = city?.replaceAll(" ", "+");

        const handleDelete = (e) => {
          e.stopPropagation();
          setCityToDelete(city);
          setIsOpenModal(true);
        };

        return (
          <div
            key={city}
            className="selected-cities-list-item"
            onClick={() => navigate(`/react-weather-wise/${cityName}`)}
          >
            <div>{city}</div>
            <DeleteOutlineIcon onClick={handleDelete} />
          </div>
        );
      })}
    </div>
  );
}

export default SelectedCities;
