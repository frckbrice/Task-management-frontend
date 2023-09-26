import React, { memo, useContext, useState, useRef } from "react";

import "./PopupForm.css";


const PopupForm = ({
  inputText,
  textarea,
  onSubmit,
  buttonText,
  id,
  onchangeName,
  value,
  description,
  idDescription,
  onchangeDescription,
  disabled,
  errClass,
  errMsg,
}) => {
  const errorRef = useRef();

 

  return (
    <div>
      {/* <form className="popup-form" onSubmit={handleInvite}> */}
      <form className="popup-form" onSubmit={onSubmit}>
        <p ref={errorRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>
        <input
          type="text"
          placeholder={inputText}
          value={value}
          onChange={onchangeName}
          id={id}
        />
        <textarea
          value={description}
          id={idDescription}
          placeholder={textarea}
          cols={10}
          onChange={onchangeDescription}
        />
        <button disabled={disabled}>{buttonText}</button>
      </form>
    </div>
  );
};

export default memo(PopupForm);
