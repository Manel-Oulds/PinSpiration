import csrfFetch from "./csrf";
import { SET_BOARD } from "./board";

const RECEIVE_USER = "users/receiveUser";
export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};

export const fetchUser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`);
  const data = await res.json();
  dispatch(receiveUser(data.user));
};

const RECEIVE_ALL_USERS = "users/receiveAllUsers";

export const receiveAllUsers = (users) => {
  return {
    type: RECEIVE_ALL_USERS,
    users,
  };
};

export const fetchAllUsers = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users`);
  const data = await res.json();
  dispatch(receiveAllUsers(data.users));
};

export default function userReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_USER:
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_ALL_USERS:
      action.users?.forEach((user) => {
        newState[user.id] = user;
      });
      return newState;
    case SET_BOARD:
      // debugger;
      const usercopy = { ...state[action.payload.userId] };
      const boardIds = [...usercopy.boardIds, action.payload.id];
      usercopy.boardIds = boardIds;
      newState[usercopy.id] = usercopy;
      return newState;
    default:
      return state;
  }
}
