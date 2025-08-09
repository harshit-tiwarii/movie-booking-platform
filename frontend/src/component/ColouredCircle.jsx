import React from "react";

const ColouredCircle = ({ size = "200px", color = "bg-pink-400", top = "0", left = "0", right, bottom }) => {
  return (
    <div
      className={`absolute rounded-full ${color} opacity-30 blur-2xl z-0`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
      }}
    ></div>
  );
};

export default ColouredCircle;
