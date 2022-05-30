import React from "react";

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
       
  function handleEmailChange(evt) {
    setEmail(evt.target.value);
    }
    
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
    }
    
  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="authform" >
      <h3 className="authform__title">Вход</h3>
      <form className="authform__form" name="authform-login" onSubmit={handleSubmit}>
     
        <input 
            className="authform__input" 
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            required 
            minLength="2" 
            maxLength="30"
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
        />
        
        <button className="authform__button" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;