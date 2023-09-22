import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useEffect, useState } from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import { Navigate, Route, useNavigate, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import * as apiAuth from "../utils/ApiAuth";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";

export default function App() {
  const [cards, setCards] = useState([])

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [isSurePopupOpen, setIsSurePopupOpen] = useState(false)

  const [isHandleCardDelete, setIsHandleCardDelete] = useState("")

  const [currentUser, setCurrentUser] = useState({})

  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [headerEmail, setHeaderEmail] = useState("");

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsSurePopupOpen(false)
    setSelectedCard(null)
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard({ link: card.link, name: card.name })
  }

  function handleSureClick(id) {
    setIsHandleCardDelete(id)
    setIsSurePopupOpen(true)
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    const rout = localStorage.getItem("jwt");
    api.changeLikeCardStatus(card._id, !isLiked, rout).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    }).catch(error => { console.log(error) });
  }

  function handleDeleteClick(event) {
    event.preventDefault()
    const rout = localStorage.getItem("jwt");
    api.deleteCard(isHandleCardDelete, rout)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== isHandleCardDelete
        }))
        closeAllPopups()
      }).catch((err) => { console.log(`При удалении карточки: ${err}`) });
  }

  useEffect(() => {
    localStorage.getItem("jwt");
    if (loggedIn) {
      Promise.all([api.getInitialCards(localStorage.jwt), api.getCards(localStorage.jwt)])
        .then(([dataUserServer, dataCardServer]) => {
          setCurrentUser(dataUserServer)
          setCards(dataCardServer)
        })
        .catch((err) => { console.log(`При добавлении карточек: ${err}`) });
    }
  }, [loggedIn])

  function handleUpdateUser({ name, about }) {
    const rout = localStorage.getItem("jwt");
    api.setUserInfo({ name, about }, rout)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      }).catch((err) => { console.log(`При добавлении исходных имени и статуса: ${err}`) });
  }

  function handleUpdateAvatar(data) {
    const rout = localStorage.getItem("jwt");
    api.setUserAvatar(data, rout)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => { console.log(`При обновлении аватара: ${err}`) });
  }

  function handleAddPlaceSubmit({ name, link }) {
    const rout = localStorage.getItem("jwt");
    api.createNewCard({ name, link }, rout)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      }).catch((err) => { console.log(`При добавлении новых карточек: ${err}`) });
  }

  useEffect(() => {
    function routCheck() {
      const rout = localStorage.getItem("jwt");
      if (rout) {
        apiAuth
          .routCheck(rout)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              navigate("/");
              setHeaderEmail(res.email);
            }
          })
          .catch((err) => { console.log(`При routCheck: ${err}`) });
      } else {
        setLoggedIn(false);
      }
    }
    routCheck();
  }, [navigate]);


  function onRegister(data) {
    apiAuth
      .signup(data)
      .then((data) => {
        if (data) {
          setIsInfoTooltipPopup(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopup(false);
        console.log(`При onRegister: ${err}`);
      })
      .finally(() =>
        setIsInfoTooltipPopupOpen(true));
  }

  function onLogin(data) {
    apiAuth
      .signin(data)
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("jwt", data.token);
          setHeaderEmail(data.email);
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopup(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(`При onLogin: ${err}`);
      });
  }

  function onSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setHeaderEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header loggedIn={loggedIn} email={headerEmail} onSignOut={onSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardSure={handleSureClick}
                onCardLike={handleCardLike}
                cards={cards}
                loggedIn={loggedIn}
                element={Main}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/sign-in"} />}
          />
        </Routes>

        <InfoTooltip
          name="infotooltip"
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isStatus={isInfoTooltipPopup}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}>
        </EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}>
        </AddPlacePopup>

        <PopupWithForm
          name='sure'
          title='Вы уверены?'
          buttonSave='Да'
          isOpen={isSurePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteClick}
        >
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}>
        </ImagePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        >
        </EditAvatarPopup>

        {loggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider >
  );
}
