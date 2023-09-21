import logoHeader from "../../images/logo-header.svg"

import { useLocation, Routes, Route, Link, Navigate } from "react-router-dom";

export default function Header({ email, loggedIn, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img
        className="logo"
        src={logoHeader}
        alt="логотип"
      />
      <div className="header__authorization">
        {loggedIn && <p className="header__email">{email}</p>}
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__sign">Войти</Link>
            } />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__sign">Регистрация</Link>
            } />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/sign-in"} />
            } />
        </Routes>
        {loggedIn && (
          <button className="header__log" onClick={onSignOut}>
            {loggedIn ? "Выйти" : location.pathname === "/sign-in" ? "Регистрация" : "Войти"}
          </button>
        )}
      </div>
    </header>
  );
}