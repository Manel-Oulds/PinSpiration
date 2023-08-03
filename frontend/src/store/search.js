import csrfFetch from "./csrf";

export const GET_SEARCH_RESULTS = "search/receiveSearchResults";
export const CLEAR_SEARCH_RESULTS = "search/clearSearchResults";

export const receiveSearchResults = (searchResults) => {
  return {
    type: GET_SEARCH_RESULTS,
    searchResults,
  };
};

export const clearSearchresults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS,
  };
};

export const fetchSearchResults = (query) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins/search?query=${query}`);
  const data = await response.json();
  dispatch(receiveSearchResults(data));
};

const searchReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return { ...action.searchResults.pins };
    case CLEAR_SEARCH_RESULTS:
      return {};
    default:
      return newState;
  }
};

export default searchReducer;
