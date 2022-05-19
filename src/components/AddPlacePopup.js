import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]); 

  function handleCardNameChange(evt) {
    setName(evt.target.value);
  }

  function handleCardLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({name, link});
  } 

  return ( 
    <PopupWithForm
        title="Новое место"
        name="add"
        buttonSubmitText="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >                 
        <div className="popup__form-field"> 
            <input 
                className="popup__input popup__input_place" 
                id="place" 
                type="text" 
                name="place"
                value={name} 
                placeholder="Название" 
                required 
                minLength="2" 
                maxLength="30"
                onChange={handleCardNameChange}
            />
            <span className="popup__input-error place-error"></span>
        </div>
        <div className="popup__form-field">
            <input 
                className="popup__input popup__input_image" 
                id="image" 
                type="url" 
                name="link"
                value={link} 
                placeholder="Ссылка на картинку" 
                required
                onChange={handleCardLinkChange}
            />
            <span className="popup__input-error image-error"></span>
        </div>       
    </PopupWithForm>
    );
}
    
export default AddPlacePopup;