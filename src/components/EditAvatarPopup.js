import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarLink = React.useRef(); 
  
  React.useEffect(() => {
    avatarLink.current.value = '';
  }, [isOpen]); 
  
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({avatar: avatarLink.current.value});
  } 

  return ( 
    <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        buttonSubmitText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >          
        <div className="popup__form-field">
            <input 
                className="popup__input popup__input_avatar" 
                id="avatar" 
                type="url" 
                name="avatar"
                ref={avatarLink}
                placeholder="Ссылка на аватар" 
                required
            />
            <span className="popup__input-error avatar-error"></span>
          </div>
    </PopupWithForm>
    );
}
    
export default EditAvatarPopup;