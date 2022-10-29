import logo from "../images/header-logo.svg"
import { Switch, Route, Link } from 'react-router-dom'
import toggleList from "../utils/toggleList";
import { translations } from "../contexts/TranslationContext";
import { TranslationContext } from "../contexts/TranslationContext";
import { useContext } from "react";


function Header({ onSignOut, userEmail }) {
  const translation = useContext(TranslationContext)
  return (

    <header className="header">
      <button type="button" className="header__bar_mobile-button" id="navbar-toggle" onClick={toggleList}></button>
      <img src={logo} alt="Логотип Место" className="header__logo" />
      <Switch>
        <Route path="/sign-in">
          <Link className="auth__link auth__link_location-header" to="/sign-up">
            Зарегистрироваться
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link className="auth__link auth__link_location-header" to="/sign-in">
            Войти
          </Link>
        </Route>
        <Route path="/">
          <div className="header__bar" id="header__bar">
            <span className='auth__email header__bar-item'>{userEmail || ''}</span>
            <Link onClick={onSignOut} className="auth__link auth__link_location-header header__bar-item" to="/sign-in">
            Выйти
            </Link>
          </div>
        </Route>
      </Switch>

    </header>
  );
}

export default Header