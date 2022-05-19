import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_image ${card.link && "popup_opened"}`}>
      <div className="popup__photo-container">
        <img className="popup__photo" src={`${card.link}`} alt={`${card.name}`} />
        <p className="popup__photo-caption">{card.name}</p>
        <button 
          className="popup__close-button popup__close-button_photo" 
          type="button" 
          aria-label="Close"
          onClick={onClose}>
        </button>
      </div>
    </div>
  );
}

export default ImagePopup;




