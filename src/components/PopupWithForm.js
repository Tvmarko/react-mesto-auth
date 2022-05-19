import React from "react";

function PopupWithForm({ title, name, buttonSubmitText, children, isOpen, onClose, onSubmit }) {

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_${name}`}>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={`popup__form_${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit" >{buttonSubmitText}</button>
        </form>
        <button className="popup__close-button" type="button" aria-label="Close" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm;