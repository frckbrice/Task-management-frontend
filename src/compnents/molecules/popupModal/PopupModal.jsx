import React from "react";

// libery imports
import { MdOutlineCancel } from "react-icons/md";

import "./PopupModal.css";

const PopupModal = ({ title, onClick, children }) => {
  return (
    <div className="popup-modal">
      <div className="modal-top">
        <p> </p>
        <button onClick={onClick}>
          <MdOutlineCancel className="outlinecancel"/>
        </button>
      </div>
      {children}
    </div>
  );
};

export default PopupModal;
