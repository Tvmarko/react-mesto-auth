import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import deletebutton from "../images/delete-button.svg";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `elements__element-delete ${isOwn ? "elements__element-delete_active" : ''}`; 

    const isLiked = card.likes.some(user => user._id === currentUser._id);
    const cardLikeButtonClassName = `elements__element-like ${isLiked ? "elements__element-like_active": ''}`;

    function handleClick() {
        onCardClick(card);
      }

    function handleLikeClick() {
        onCardLike(card);
      }

      function handleDeleteClick() {
        onCardDelete(card);
      }

    return (
        <div className="elements__element">
            <div className= "elements__element-image">
                <img 
                    className="elements__element-photo" 
                    src={`${card.link}`} 
                    alt={card.name}
                    onClick={handleClick}
                />
                <button 
                    className={cardDeleteButtonClassName}
                    onClick={handleDeleteClick}
                    type="button">
                    <img src={deletebutton} alt="Delete"/>
                </button>
            </div>
            <div className="elements__element-place">
                <h3 className="elements__element-title">{card.name}</h3>
                <div className="elements__element-like-container">
                    <button 
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                        type="button" 
                        aria-label="Like">
                    </button>
                    <span className="elements__element-like-count">{card.likes.length}</span>
                </div> 
            </div>
        </div>
    );
}
    
export default Card;

