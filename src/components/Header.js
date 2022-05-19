import React from "react";
import headerlogo from "../images/header-logo.svg";

function Header() {
  return (
    <header className="header"> 
        <img className="header__logo" src={headerlogo} alt="логотип"/>
      </header>
  );
}

export default Header;