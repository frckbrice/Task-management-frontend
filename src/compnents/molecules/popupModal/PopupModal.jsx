import React from "react";

// libery imports
import { MdOutlineCancel } from "react-icons/md";

import "./PopupModal.css";

const PopupModal = ({ title, onClick, children }) => {
  return (
    <div className="popup-modal">
      <div className="modal-top">
        <p>{title}</p>
        <button onClick={onClick}>
          <MdOutlineCancel />
        </button>
      </div>
      {children}
    </div>
  );
};

export default PopupModal;
