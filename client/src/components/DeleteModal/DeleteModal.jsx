import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import "./DeleteModal.scss";
import { deleteWeatherData } from "../../features/citiesSlice";

const DeleteModal = (props) => {
  const { city, isOpen, closeModal } = props;

  const dispatch = useDispatch();

  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const handleClickOutside = (e) => {
    const dialogDimensions = modalRef.current?.getBoundingClientRect();

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      closeModal();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8000/weather-data/${city}`);
    dispatch(deleteWeatherData(city));
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <dialog
          ref={modalRef}
          onClick={handleClickOutside}
          onKeyDown={handleKeyDown}
        >
          <HighlightOffIcon className="remove-icon" />
          <div>
            <h2 className="title">Are you sure?</h2>
            <div className="content">
              Do you really want to delete the weather data of{" "}
              <strong>{city} </strong>?
            </div>
          </div>
          <div className="buttons">
            <button className="cancel" onClick={closeModal}>
              Cancel
            </button>
            <button className="delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </dialog>
      )}
    </>
  );
};

export default DeleteModal;
