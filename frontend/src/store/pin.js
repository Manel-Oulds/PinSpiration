import React from "react";
import csrfFetch from "./csrf";
import { useSelector } from "react-redux";
import * as userActions from "./session";
import { fetchAllBoardPins } from "./boardPins";

const SET_PIN = "pins/setPin";
const REMOVE_PIN = "pins/removePin";
const GET_PIN = "pins/getPin";
const GET_PINS = "pins/getPins";

const setPin = (pin) => {
  return {
    type: SET_PIN,
    payload: pin,
  };
};

const removePin = (pinId) => {
  return {
    type: REMOVE_PIN,
    payload: pinId,
  };
};

const getPin = (pin) => {
  return {
    type: GET_PIN,
    payload: pin,
  };
};

const getPins = (pins) => {
  return {
    type: GET_PINS,
    payload: pins,
  };
};

export const fetchAllPins = () => async (dispatch) => {
  const response = await csrfFetch(`/api/pins`);
  const data = await response.json();
  dispatch(getPins(data.pins));
  return response;
};

export const fetchPins = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins?user_id=${userId}`);
  const data = await response.json();
  // debugger;
  dispatch(getPins(data.pins));
};

export const createPin = (formData) => async (dispatch, getState) => {
  const response = await csrfFetch("/api/pins", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  const { user } = getState().session;
  const updatedUser = { ...user, pinIds: [...user.pinIds, data.pin.id] };
  dispatch(setPin(data.pin));
  dispatch(userActions.setCurrentUser(updatedUser));
  return data.pin;
};

export const fetchPin = (pinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins/${pinId}`);
  const data = await response.json();
  dispatch(getPin(data.pin));
};

export const updatePin = (pin) => async (dispatch) => {
  const { title, description } = pin;
  const response = await csrfFetch(`/api/pins/${pin.id}`, {
    method: "PATCH",
    body: JSON.stringify({ title, description }),
  });
  const data = await response.json();
  dispatch(setPin(data.pin));
};

export const deletePin = (pinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/pins/${pinId}`, {
    method: "DELETE", 
  });
  dispatch(removePin(pinId));
  dispatch(fetchAllBoardPins());
};

export default function pinReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case SET_PIN:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_PIN:
      delete newState[action.payload];
      return { ...newState };
    case GET_PIN:
      return { ...state, [action.payload.id]: action.payload };
    case GET_PINS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
