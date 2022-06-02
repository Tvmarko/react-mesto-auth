import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js"; 
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState({isOpen: false, successful: false});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [email, setEmail] = useState("");
  const history = useHistory();
  
  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err); 
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token){
      auth.checkToken(token)
        .then((res) => {
          if(res){
            setEmail(res.data.email);
            handleLoggedIn();
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err); 
        });
    }
  }, [history]);

  function handleRegister(email, password){
    auth.register(email, password)
      .then((res) => {
        if(res){
          handleInfoTooltip(true);
          history.push("/sign-in");
        } 
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      })
  }

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((data) => {
        if(data.token){
          setEmail(email);
          handleLoggedIn();
          localStorage.setItem('jwt', data.token);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      })
  }

  function handleSignOut() {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('jwt');
    history.push("/sign-in");
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }
  
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

  function handleInfoTooltip(result) {
    setInfoTooltip({...isInfoTooltip, isOpen: true, successful: result});
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({});
    setInfoTooltip(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          email={email}
          onSignOut={handleSignOut}
        />
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onLogin={handleLogin}
            />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" />: <Redirect to="/sign-in" />}
          </Route> 
        </Switch>
                
        <Footer/>

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

        <InfoTooltip 
          result={isInfoTooltip} 
          onClose={closeAllPopups} 
          sucsessInfo="Вы успешно зарегистрировались!"
          unsucsessInfo="Что-то пошло не так! Попробуйте еще раз."
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

