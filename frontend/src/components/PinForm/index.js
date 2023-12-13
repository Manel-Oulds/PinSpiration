import React, { useState, useRef, useEffect } from "react";
import "./Pin.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as pinActions from "../../store/pin";
import * as boardActions from "../../store/board";
import Navigation from "../Navigation";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { addBoardPin, fetchAllBoardPins } from "../../store/boardPins";
import { fetchUser } from "../../store/user";

function Pin() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showLoad, setShowLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const fileInputRef = useRef(null);
  const userBoards = useSelector(
    (state) => state.users[sessionUser.id]?.boardIds
  );
  const boards = useSelector((state) => state.boards);
  let err = false;

  const pinBoardIds = useSelector((state) => state.boardPins);
  const boardIds = useSelector((state) => state.boards);
  const allPinsBoardId = userBoards?.find(
    (boardId) => boards[boardId]?.title === "All Pins"
  );
  const [selectedBoard, setSelectedBoard] = useState(allPinsBoardId);

  const handleSelectChange = (event) => {
    setSelectedBoard(event.target.value);
  };
  const isAllPinsBoardExist = (boards) => {
    return Object.values(boards).some((board) => board.title === "All Pins");
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      await dispatch(boardActions.fetchBoards(sessionUser.id));
      await dispatch(boardActions.fetchAllBoards());
      await dispatch(fetchAllBoardPins());
      await dispatch(pinActions.fetchAllPins());
      await dispatch(fetchUser(sessionUser.id));
      setLoading(false);
    };

    fetchInitialData();
  }, [dispatch, sessionUser.id]);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleCreate = async (e) => {
    setShowLoad(true);
    setErrors([]);
    e.preventDefault();
    const formData = new FormData();
    formData.append("pin[description]", description);
    formData.append("pin[user_id]", sessionUser.id);
    formData.append("pin[title]", title);
    if (image) {
      formData.append("pin[image]", image);
    }

    try {
      const data = await dispatch(pinActions.createPin(formData));
      const createdPinId = data?.id;

      if (!data?.errors) {
        dispatch(
          addBoardPin({
            board_pin: {
              board_id: selectedBoard,
              pin_id: createdPinId,
            },
          })
        );

        history.push(`/users/${sessionUser.id}`);
      }
      setShowLoad(false);
    } catch (error) {
      console.error("Error creating Pin:", error);
      setShowLoad(false);
    }
  };

  const handleFile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setImage(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => setImageUrl(fileReader.result);
    } else setImageUrl(null);
  };

  let preview = null;

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="pin-div">
        <Navigation />
        <div className="create-pin" style={{ height: "100vh" }}>
          <div className="div-create-title" style={{ display: "flex" }}>
            <div
              className="div-left"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i
                class="fa-solid fa-angles-right fa-xl"
                style={{ margin: "auto" }}
              ></i>
            </div>
            <div className="div-right">
              <div
                style={{
                  color: "black",
                  fontSize: "25px",
                  fontFamily: "sans-serif",
                  margin: "25px",
                }}
              >
                {" "}
                Create pin
              </div>
            </div>
          </div>
          <div
            className="div-create-form"
            style={{ display: "flex", height: "100%" }}
          >
            <div className="div-left-bottom">
              <div
                className="sub-div-left-bottom"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i
                  class="fa-solid fa-plus fa-xl"
                  style={{ margin: "auto" }}
                ></i>
              </div>
            </div>
            <div className="div-right-bottom">
               <form onSubmit={handleCreate}>
               <ul className="errors">
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
                <div className="information">
                  <div className="div-upload-save">
                    <div className="image-pin-upload" onClick={handleDivClick} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                      <input
                        className="input-file"
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFile}
                        placeholder="Choose a file"
                      />
                      {image ? (
                        <img
                          src={imageUrl}
                          alt="Selected"
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <div style={{display:"flex", flexDirection:"column"}}>
                         <p><i class="fa-solid fa-upload fa-2xl" style={{color: "#000000"}}></i></p>

                          <p className="image-text"> Click here to upload an image </p>       
                        </div>
                       
                      )}
                    </div>
                    <div style={{borderBottom:"1px solid lightgray", marginTop:"5px"}}></div>
                    <button
                        className="edit"
                        style={{ backgroundColor: "rgb(234, 233, 233)", color:"black" }}
                      >
                        Save Pin
                      </button>
                  </div>
                  
                  <div className="info-pin">
                  {/* <div className="profile-infos">
                      <input
                        type="text"
                        className="input-username"
                        value={`${sessionUser.username[0]}`}
                        disabled
                      />
                      <div className="use">
                        <NavLink
                          className="nav-prof"
                          to={`/${sessionUser.username}`}
                        >
                          {sessionUser.username}
                        </NavLink>
                        <NavLink
                          className="nav-prof"
                          to={`/${sessionUser.username}`}
                        >
                          {sessionUser.email}
                        </NavLink>
                      </div>
                    </div> */}
                    
                    <label>Title</label>
                    <input
                      className="my-input pintitle"
                      type="text"
                      value={title}
                      placeholder="Add your title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {title.length === 0 && (err = true) && (
                      <p>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        Hmm...title can't be empty.
                      </p>
                    )}
                    <label>Description</label>
                    <input
                      className="my-input pindescription"
                      type="text"
                      placeholder="Add a detailed description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div style={{borderBottom: "1px solid lightgray", marginTop: "5px", margin:"15px"}}></div>
                    <label>Board</label>
                    
                      
                      <select
                        value={selectedBoard}
                        onChange={handleSelectChange}
                        className="my-input"
                      >
                        <option value={allPinsBoardId}>All Pins</option>
                        {userBoards?.map((boardId) => {
                          const board = boards[boardId];
                          if (board && boardId !== allPinsBoardId) {
                            return (
                              <option key={boardId} value={boardId}>
                                {board.title}
                              </option>
                            );
                          }
                        })}
                      </select>
                      
                   
                  </div>
                </div>
              </form> 
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
