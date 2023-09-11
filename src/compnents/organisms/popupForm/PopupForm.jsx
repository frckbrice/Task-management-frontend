import React from "react";

import "./PopupForm.css";

const PopupForm = ({ inputText, textarea, onSubmit, buttonText }) => {
  return (
    <div>
      <form className="popup-form" action="" onSubmit={onSubmit}>
        <input type="text" placeholder={inputText} />
        <textarea name="" id="" placeholder={textarea}></textarea>
        <button>{buttonText}</button>
      </form>
    </div>
  );
};

export default PopupForm;
