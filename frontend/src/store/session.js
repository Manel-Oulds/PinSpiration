import csrfFetch from "./csrf";
import { SET_BOARD, createBoard } from "./board";
import { REMOVE_PIN } from "./pin";

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

export const storeCurrentUser = (user) => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
};

const SET_CURRENT_USER = "session/setCurrentUser";
const REMOVE_CURRENT_USER = "session/removeCurrentUser";
const UPDATE_CURRENT_USER = "updateCurrentUser";

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

export const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER,
  };
};

export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  };

export const signup =
  ({ email, username, birthdate, password }) =>
  async (dispatch) => {
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, username, birthdate, password }),
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    await dispatch(setCurrentUser(data.user));
    const { user_id } = data.user.id;
    // dispatch(createBoard({title:"All Pins",user_id}));
    return response;
  };

export const update = (user) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${user.id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  //Fetch data user after login
  // if (data.user) {
  //   await dispatch(restoreSession()); // This action fetches the user data
  // }
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  // const history = useHistory();
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return response;
  // history.push("/");
};

export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

const initialState = {
  user: JSON.parse(sessionStorage.getItem("currentUser")),
};

const sessionReducer = (state= initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...newState, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...newState, user: null };
    case UPDATE_CURRENT_USER:
      return { ...newState, user: action.payload };
    case SET_BOARD:
      // debugger;
      const boardIds = [...newState.user.boardIds, action.payload.id];
      const usercopy = { ...newState.user };
      usercopy.boardIds = boardIds;
      return { user: usercopy };
    // const updatedUserBoardIds = [...state.user.boardIds, action.payload.id];
    // const updatedUserBoard = { ...state.user, boardIds: updatedUserBoardIds };
    // return { ...state, user: updatedUserBoard };
    case REMOVE_PIN:
      const updatedUser = {
        ...newState.user,
        pinIds: newState.user.pinIds.filter(
          (pinId) => pinId !== action.payload
        ),
      };
      return { ...newState, user: updatedUser };
    default:
      return state;
  }
};



export default sessionReducer;
