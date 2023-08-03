import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchSearchResults } from "../../store/search";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Navigation from "../Navigation";
import { ClassNames } from "@emotion/react";
function SearchPage() {
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
  useEffect(() => {
    dispatch(fetchSearchResults(query));
  }, []);
  return (
    <>
      <Navigation />
      <h1> Results for {query}</h1>
      {searchresults?.map((item) => (
        <img src={pins[item.id].imgUrl} className="user-pins" alt="No pin" />
      ))}
      
    </>
  );
}
export default SearchPage;
