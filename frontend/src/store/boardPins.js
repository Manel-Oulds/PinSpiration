import React from "react";
import csrfFetch from "./csrf";

const GET_BOARD_PIN = "boardPins/getBoardPin";
const GET_BOARD_PINS = "boardPins/getBoardPins";
const CREATE_BOARD_PIN = "boardPins/createBoardPin";
const DELETE_PIN = "boardPins/deletePinFromBoard";
const EDIT_BOARD_PIN = "boardPins/editBoardPin";

export const getBoardPins = (boardPins) => ({
  type: GET_BOARD_PINS,
  payload: boardPins,
});

export const createBoardPin = (boardId, pinId) => ({
  type: CREATE_BOARD_PIN,
  payload: { boardId, pinId },
});

export const deletePinFromBoard = (boardId, pinId) => ({
  type: DELETE_PIN,
  payload: { boardId, pinId },
});

export const editBoardPin = (boardId, pinId, updatedData) => ({
  type: EDIT_BOARD_PIN,
  payload: { boardId, pinId, updatedData },
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

export const removePinFromBoard = (boardId, pinId) => async (dispatch) => {
  const response = await csrfFetch(`/api/board_pins`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ board_id: boardId, pin_id: pinId }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error("Error removing pin from board:", errorMessage);
    throw new Error("Failed to remove pin from board");
  }

  // dispatch(deletePinFromBoard(boardId, pinId));
};

export const updateBoardPin =
  (boardId, pinId, updatedData) => async (dispatch) => {
    try {
      // Make the API call to update the board pin on the server
      const response = await csrfFetch(`/api/board_pins/${boardId}/${pinId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error updating BoardPin:", errorMessage);
        throw new Error("Failed to update BoardPin");
      }

      // If the API call is successful, dispatch the updateBoardPin action
      dispatch(editBoardPin(boardId, pinId, updatedData));
    } catch (error) {
      console.error("Error updating BoardPin:", error);
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

    // case DELETE_PIN:
    //   const { boardId: boardIdToRemove, pinId: pinIdToRemove } = action.payload;
    //   if (state.boardPins[boardIdToRemove]) {
    //     const updatedPins = state.boardPins[boardIdToRemove].filter(
    //       (pinId) => pinId !== pinIdToRemove
    //     );
    //     return {
    //       ...state,
    //       boardPins: {
    //         ...state.boardPins,
    //         [boardIdToRemove]: updatedPins,
    //       },
    //     };
    //   }
    //   return state;

    case EDIT_BOARD_PIN:
      const updatedBoardPins = { ...state.boardPins };
      if (updatedBoardPins[action.payload.boardId]) {
        const boardPinIndex = updatedBoardPins[
          action.payload.boardId
        ].findIndex((existingPinId) => existingPinId === action.payload.pinId);
        if (boardPinIndex !== -1) {
          updatedBoardPins[action.payload.boardId][boardPinIndex] =
            action.payload.updatedData;
          return {
            ...state,
            boardPins: updatedBoardPins,
          };
        }
      }
      return state;

    default:
      return state;
  }
}
