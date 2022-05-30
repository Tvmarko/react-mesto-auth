import React from "react";
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
    
  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }
          
  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }
    
  return (
    <div className="authform" >
      <h3 className="authform__title">Регистрация</h3>
      <form className="authform__form" name="authform-register" onSubmit={handleSubmit}>
        <input 
            className="authform__input" 
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            required 
            minLength="2" 
            maxLength="30"
            onChange={handleChangeEmail}
        />
        <input 
            className="authform__input" 
            type="password"
            name="password"
            value={password}
            placeholder="Пароль"
            required 
            minLength="2" 
            maxLength="12"
            onChange={handleChangePassword}
        />
        <button className="authform__button" type="submit">Зарегистрироваться</button>
        <div className="authform__info">
          <p className="authform__text">Уже зарегистрированы?&nbsp;</p>
          <Link to="/sign-in" className="authform__link">Войти</Link>
        </div>
      </form>
    </div>
  )
}
   
export default Register;