import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
      
  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData);
      setCards(cards);
    })
    .catch((err) => {
      console.log(err); 
    });
}, []);

  function handleUpdateUser(user) {
    api.editProfile(user)
      .then((userUpdatedData) => {
        setCurrentUser({
          ...currentUser,
          name: userUpdatedData.name,
          about: userUpdatedData.about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function handleUpdateAvatar({avatar}) {
    api.editAvatar(avatar)
      .then((userUpdatedData) => {
        setCurrentUser({
          ...currentUser,
          avatar: userUpdatedData.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); 
      });
  }
  
  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((userAddedCard) => {
        setCards([userAddedCard, ...cards]);
        closeAllPopups();
       })
       .catch((err) => {
         console.log(err); 
       });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.handleLikeCardStatus(card._id, !isLiked)
    .then((cardHandledLikes) => {
      setCards(cards.map((c) => c._id === card._id ? cardHandledLikes : c));
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card)
    .then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}     
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />          
          
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}             
        />

        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

