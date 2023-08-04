import React from "react";
import csrfFetch from "./csrf";
import { useSelector } from "react-redux";
import * as userActions from "./session";

export const SET_BOARD = "boards/setBoard";
const REMOVE_BOARD = "boards/removeBoard";
const GET_BOARD = "boards/getBoard";
const GET_BOARDS = "boards/getBoards";

const setBoard = (board) => {
  return {
    type: SET_BOARD,
    payload: board,
  };
};

const removeBoard = (boardId) => {
  return {
    type: REMOVE_BOARD,
    payload: boardId,
  };
};

const getBoard = (board) => {
  return {
    type: GET_BOARD,
    payload: board,
  };
};

const getBoards = (boards) => {
  return {
    type: GET_BOARDS,
    payload: boards,
  };
};

export const fetchAllBoards = () => async (dispatch) => {
  const response = await csrfFetch(`/api/boards`);
  const data = await response.json();
  dispatch(getBoards(data.boards));
  return response;
};

export const fetchBoards = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/boards?user_id=${userId}`);
  const data = await response.json();
  // debugger;
  dispatch(getBoards(data.boards));
};

export const createBoard = (board) => async (dispatch, getState) => {
  const response = await csrfFetch("/api/boards", {
    method: "POST",
    body: JSON.stringify(board),
  });
  const data = await response.json();
  dispatch(setBoard(data.board));
};

export const fetchBoard = (boardId) => async (dispatch) => {
  const response = await csrfFetch(`/api/boards/${boardId}`);
  const data = await response.json();
  dispatch(getBoard(data.board));
};

export const updateBoard = (board) => async (dispatch) => {
  const { title } = board;
  const response = await csrfFetch(`/api/boards/${board.id}`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
  });
  const data = await response.json();
  dispatch(setBoard(data.board));
};

export const deleteBoard = (boardId) => async (dispatch) => {
  const response = await csrfFetch(`/api/boards/${boardId}`, {
    method: "DELETE",
  });
  dispatch(removeBoard(boardId));
};

export default function boardReducer(state = {}, action) {
  const newState = { ...state };
  switch (action.type) {
    case SET_BOARD:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_BOARD:
      delete newState[action.payload];
      return { ...newState };
    case GET_BOARD:
      return { ...state, [action.payload.id]: action.payload };
    case GET_BOARDS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
