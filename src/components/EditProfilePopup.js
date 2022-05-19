import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("name");
  const [description, setDescription] = React.useState("about");

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleAboutChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({name, about: description});
  } 

  return ( 
    <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        buttonSubmitText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >          
        <div className="popup__form-field">
        <input 
            className="popup__input popup__input_name" 
            id="name" 
            type="text" 
            name="name" 
            value={name || ''} 
            placeholder="Ваше имя" 
            required 
            minLength="2" 
            maxLength="40"
            onChange={handleNameChange}
        />
        <span className="popup__input-error name-error"></span>
        </div>
        <div className="popup__form-field"> 
        <input 
            className="popup__input popup__input_about" 
            id="about" 
            type="text" 
            name="about"
            value={description || ''} 
            placeholder="Ваш род деятельности" 
            required 
            minLength="2" 
            maxLength="200"
            onChange={handleAboutChange}
        />
        <span className="popup__input-error about-error"></span>
        </div>
    </PopupWithForm>
    );
}
    
export default EditProfilePopup;