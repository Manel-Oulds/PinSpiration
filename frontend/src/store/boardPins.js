import React from "react";
import csrfFetch from "./csrf";

const GET_BOARD_PIN = "boardPins/getBoardPin";
const GET_BOARD_PINS = "boardPins/getBoardPins";
const CREATE_BOARD_PIN = "boardPins/createBoardPin";

export const getBoardPins = (boardPins) => ({
  type: GET_BOARD_PINS,
  payload: boardPins,
});

export const createBoardPin = (boardId, pinId) => ({
  type: CREATE_BOARD_PIN,
  payload: { boardId, pinId },
});

export const fetchBoardPins = (boardId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/boardPins?board_id=${boardId}`);
    const boardPinsData = await response.json();
    dispatch(getBoardPins(boardPinsData));
  } catch (error) {
    console.error("Error fetching board pins:", error);
  }
};

export const fetchAllBoardPins = () => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/board_pins`);
    const boardPinsData = await response.json();
    console.log(boardPinsData);
    dispatch(getBoardPins(boardPinsData));
  } catch (error) {
    console.error("Error fetching board pins:", error);
  }
};

export const addBoardPin = (boardPin) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/board_pins`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(boardPin),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error creating BoardPin:", errorMessage);
      throw new Error("Failed to create BoardPin");
    }

    const data = await response.json();
    dispatch(createBoardPin(boardPin));
    dispatch(fetchBoardPins(boardPin.boardId));
  } catch (error) {
    console.error("Error creating BoardPin:", error);
  }
};

export default function boardPinReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case CREATE_BOARD_PIN:
      const { boardId, pinId } = action.payload;
      return {
        ...state,
        boardPins: {
          ...state.boardPins,
          [boardId]: [...state.boardPins[boardId], pinId],
        },
      };
    case GET_BOARD_PINS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}