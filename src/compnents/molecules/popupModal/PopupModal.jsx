import React from "react";

// libery imports
import { MdOutlineCancel } from "react-icons/md";

import "./PopupModal.css";

const PopupModal = ({ title, onClick }) => {
  return (
    <div className="popup-modal">
      <div className="modal-top">
        <p>{title}</p>
        <button onClick={onClick}>
          <MdOutlineCancel />
        </button>
      </div>
    </div>
  );
};

export default PopupModal;
