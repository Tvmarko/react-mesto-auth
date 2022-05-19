import React from "react";
import "../index.css";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
      <div className="profile__info-container">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя"/>
          <div className="profile__avatar-overlay">
            <button className="profile__avatar-button" type="button" aria-label="Edit" onClick={onEditAvatar}></button>
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Edit" onClick={onEditProfile}></button>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
      </div>  
      <button className="profile__add-button" type="button" aria-label="Add" onClick={onAddPlace}></button>
    </section>
    <section className="elements">
      {cards.map((card) => {
          return (
            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
          );
        })}
    </section>
  </main>
  );
}

export default Main;