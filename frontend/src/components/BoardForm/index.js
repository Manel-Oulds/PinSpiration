import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as boardActions from "../../store/board";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./BoardForm.css";

const BoardForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const user_id = useSelector((state) => state.session.user.id);
  const [errors, setErrors] = useState(null);
  const history = useHistory();


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(boardActions.createBoard({ title, user_id }))
      .then(() => {
        onClose();
      })
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }

        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <div className="create-form">
      <div className="form-content">
        <form onSubmit={handleSubmit}>
          <h1 style={{ fontSize: "45px", color: "gray", margin: "15px" }}>
            Create a New Board
          </h1>

          <br />
          <br />
          <h3 style={{ fontSize: "25px", padding: "20px" }}>Board Title</h3>
          <input
            type="text"
            className="titleInput"
            value={title}
            placeholder="Board Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />
          {errors && <p className="error">{errors}</p>}
          <input
            className={`save ${title ? "red" : ""}`}
            type="submit"
            value="Create"
            disabled={!title}
          />
        </form>
      </div>
    </div>
  );
};

export default BoardForm;
