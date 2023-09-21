import { useContext } from "react"
import profilePencil from "../../images/vector-pencil.svg"
import profilePluse from "../../images/vector-plus.svg"
import Card from "../Card/Card.jsx"
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardSure, onCardLike }) {

  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <button
            type="button"
            className="profile__avatar-button"
            onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              src={currentUser.avatar ? currentUser.avatar : "#"}
              alt="аватар" />
          </button>
          <div className="profile__info">
            <div className="profile__flex">
              <h1 className="profile__username">{currentUser.name ? currentUser.name : ""}</h1>
              <button
                type="button"
                className="profile__button-edit"
                onClick={onEditProfile}>
                <img
                  className="profile__pencil"
                  src={profilePencil}
                  alt="ручка" />
              </button>
            </div>
            <p className="profile__status">{currentUser.about ? currentUser.about : ""}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button-pluse"
          onClick={onAddPlace}>
          <img
            className="profile__pluse"
            src={profilePluse}
            alt="плюс" />
        </button>
      </section>
      <section className="elements" >
        {cards.map(data => {
          return (
            <Card
              card={data}
              onCardClick={onCardClick}
              key={data._id}
              onCardSure={onCardSure}
              onCardLike={onCardLike}
            />
          )
        })}
      </section>
    </main >
  );
}

