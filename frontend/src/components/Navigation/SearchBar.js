import React, { useState } from "react";
import { fetchSearchResults } from "../../store/search";
import { clearSearchresults } from "../../store/search";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchBar() {
  const history = useHistory();
  const [searchText, setSearchText] = useState();
  const [timer, setTimer] = useState(0);
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => Object.values(state.search));

  function handleClick(id) {
    return (e) => {
      e.preventDefault();
      history.push(`/pins/${id}`);
      dispatch(clearSearchresults());
      setSearchText("");
    };
  }

  function handelSubmit(e) {
    e.preventDefault();
    if (searchText?.trim() !== "") {
      history.push(`/search?query=${searchText}`);
      setSearchText("");
    }
  }

  function handleSearch(e) {
    const query = e.target.value;
    setSearchText(query);
    clearTimeout(timer);

    if (query.trim() !== "") {
      setTimer(setTimeout(() => dispatch(fetchSearchResults(query)), 300));
    } else {
      dispatch(clearSearchresults());
    }
  }
  return (
    <div className="searchbar-container">
      <input
        type="text"
        // className="search-bar"
        id="search-input"
        placeholder=" 🔍 Search"
        value={searchText}
        onChange={handleSearch}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handelSubmit(e);
          }
        }}
      />
      <button
        id="search-button"
        onClick={handelSubmit}
      >
        {" "}
        Search{" "}
      </button>
      
    </div>
  );
}

export default SearchBar;
