import React from "react";
import "./Pin.css";

function Pin({ pinSize }) {
  return (
    <div className="pin `${pinSize}` ">
      <img
        src="https://i.pinimg.com/474x/62/68/2d/62682d3a16518e0ccd1b5154240718fd.jpg"
        alt="pin"
      />
    </div>
  );
}

export default Pin;
