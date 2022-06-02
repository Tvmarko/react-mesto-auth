import React from "react";
import { Switch } from "react-router-dom";
import { Link, Route } from "react-router-dom";
import headerlogo from "../images/header-logo.svg";

function Header({email, onSignOut}) {
  return (
    <header className="header"> 
        <img className="header__logo" src={headerlogo} alt="логотип"/>
        <Switch>
          <Route path="/sign-in">
            <Link to="sign-up" className="header__auth-link">Регистрация</Link>
          </Route>
          <Route path="/sign-up">
            <Link to="sign-in" className="header__auth-link">Войти</Link>
          </Route>
          <Route exact path="/">
            <div className="header__auth-container">
              <p className="header__e-mail">{email}</p>
              <button
                onClick={() => {
                  onSignOut();
                }}
                className="header__auth-link header__button">Выйти</button>
            </div>
          </Route>
        </Switch>
    </header>
  );
}

export default Header;