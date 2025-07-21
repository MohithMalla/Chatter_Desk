import React from "react";

const ChatterDeskLogo = () => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const iconStyle = {
    color: "#3b82f6", // Tailwind blue-500
    width: "32px",
    height: "32px",
  };

  const textStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  };

  return (
    <div style={containerStyle} >
      <svg
        style={iconStyle}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 6C21 4.9 20.1 4 19 4H5C3.9 4 3 4.9 3 6V14C3 15.1 3.9 16 5 16H6V20L10 16H19C20.1 16 21 15.1 21 14V6Z" />
      </svg>
      <span style={textStyle} >ChatterDesk</span>
    </div>
  );
};

export default ChatterDeskLogo;
