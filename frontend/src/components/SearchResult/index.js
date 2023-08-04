import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchSearchResults } from "../../store/search";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Navigation from "../Navigation";
import Modal from "../context/Modal";
import { ShowPinItem } from "../ShowPinItem";
function SearchPage() {
  const [selectedPin, setSelectedPin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const searchresults = useSelector((state) => Object.values(state.search));
  const pins = useSelector((state) => state.pin);

  function getRandomSize() {
    const sizes = ["small", "medium", "large"];
    const randomIndex = Math.floor(Math.random() * sizes.length);
    return sizes[randomIndex];
  }
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleImageClick = (pin) => (event) => {
    setSelectedPin(pin);

    setShowModal(true);
  };

  useEffect(() => {
    dispatch(fetchSearchResults(query));
  }, []);
  return (
    <>
      <Navigation />
      <div className="container">
        {searchresults?.map((item) => (
          <div
            className={`${getRandomSize()}`}
            onClick={handleImageClick(pins[item.id])}
          >
            <img src={pins[item.id]?.imgUrl} alt="No pin" />
          </div>
        ))}
      </div>
      {showModal && selectedPin && (
        <Modal onClose={handleModalClose}>
          <ShowPinItem pin={selectedPin} />
        </Modal>
      )}
    </>
  );
}
export default SearchPage;
