import React from "react";
import "../css/backButton.css";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export function BackButton() {
  const navigate = useNavigate();
  return (
    <div id={"back-button-container"}>
      <IoIosArrowBack
        data-testid="backArrow"
        onClick={() => navigate(-1)}
        size={35}
      />
    </div>
  );
}
