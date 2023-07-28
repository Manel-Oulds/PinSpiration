import React from "react";

export function ShowPinItem({ pin }) {
  return (
    <div className="pin-item">
      <div className="image-pin">
        <img src={pin.imgUrl} className="user-pins" alt="Pin" />
      </div>
     <div className="pin-informations">
        <button className="edit-pin"><i className="fa-solid fa-ellipsis-vertical fa-beat"></i></button>
        <h2 className="title-pin">{pin.title}</h2>
      <p className="desc-pin">{pin.description}</p>
     </div>
      
    </div>
  );
}

export default ShowPinItem;
