import React from "react";
import yes from "../images/yes.png";
import no from "../images/no.png";

function InfoTooltip({ onClose, result: { isOpen, successful }, sucsessInfo, unsucsessInfo }) {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_info">
        <img className="popup__info-image" src={successful ? yes : no} alt="Значок результата"/>
        <h2 className={`popup__title popup__title_info`}>{successful ? sucsessInfo : unsucsessInfo}</h2>
        <button className="popup__close-button" type="button" aria-label="Close" onClick={onClose} />
      </div>
    </section>
  )
}
    
export default InfoTooltip;