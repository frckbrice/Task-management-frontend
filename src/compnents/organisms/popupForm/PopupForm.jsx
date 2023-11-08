import React, { memo, useContext, useState, useRef } from "react";

import "./PopupForm.css";
import PulseLoader from "react-spinners/PulseLoader";

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
  isLoad,
}) => {
  const errorRef = useRef();

  return (
    <div>
      {/* <form className="popup-form" onSubmit={handleInvite}> */}
      <form className="popup-form" onSubmit={onSubmit}>
        {isLoad && <PulseLoader color="#0707a0" size={15} />}
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
