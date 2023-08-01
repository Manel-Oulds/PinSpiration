import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./BoardShow.css";
import { fetchAllBoards, fetchBoards } from "../../store/board";
import { Link } from "react-router-dom/cjs/react-router-dom";

function BoardShow({ user }) {
  const dispatch = useDispatch();

  //Getting boardPins for that user
  const boards = useSelector((state) => {
    if (Object.values(state.boards).length === 0) {
      return [];
    } else {
      return user.boardIds.map((id) => state.boards[id]);
    }
  });
  // console.log(boards)

  const boardPins = useSelector((state) => state.boardpins);
  // console.log(boardPins)

  const pins = useSelector((state) => state.pin);
  console.log(pins);

  return (
    <div className="boards">
      {boards.map((board) => (
        <div key={board.id} className="my-board">
          <Link to={`/users/${user.id}/boards/${board.id}`}>
            <div className="board-container">
              <div className="vertical-divs">
                {board.pins.length > 0 ? (
                  <div className="div-vert1">
                    {/* {console.log(pins[Object.values(boardPins[board.id])[0]]?.imgUrl)} */}
                    <img
                      className="div-img"
                      src={pins[Object.values(boardPins[board.id])[0]]?.imgUrl}
                      alt="pin1"
                    />
                  </div>
                ) : (
                  <div className="div-vert1"> </div>
                )}
                {board.pins.length > 1 ? (
                  <div className="div-vert2">
                    <img
                      className="div-img"
                      src={pins[Object.values(boardPins[board.id])[1]]?.imgUrl}
                      alt="pin2"
                    />
                  </div>
                ) : (
                  <div className="div-vert2"></div>
                )}
              </div>
              {board.pins.length > 2 ? (
                <div className="horizontal-div">
                  <img
                    className="div-img"
                    src={pins[Object.values(boardPins[board.id])[2]]?.imgUrl}
                    alt="pin3"
                  />
                </div>
              ) : (
                <div className="horizontal-div"> </div>
              )}
            </div>
            <div className="title-board">
              <label> {board.title}</label>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BoardShow;
