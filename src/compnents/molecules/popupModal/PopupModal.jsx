import React from "react";

// libery imports
// import { MdOutlineCancel } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

import "./PopupModal.css";

const PopupModal = ({ title, onClick, children }) => {
  return (
    <div className="popup-modal">
      <div className="modal-top">
        <p>{title} </p>
        <button onClick={onClick}>
          <AiOutlineClose className="outlinecancel" />
        </button>
      </div>
      {children}
    </div>
  );
};

export default PopupModal;
