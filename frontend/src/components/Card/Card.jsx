import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Card({ card, onCardClick, onCardSure, onCardLike }) {

  const currentUser = useContext(CurrentUserContext)
  // Определяем, являемся ли мы владельцем текущей карточки
  // const isOwn = card.owner._id === currentUser._id;
  const isOwn = card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`);


  return (
    <article className="element">
      {isOwn && <button type="button" className='element__delete' onClick={() => onCardSure(card._id)} />}
      <img
        src={card.link}
        alt={card.name}
        className="element__img"
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="element__mesto">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__like-container">
          <button type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)} />
          <span className="element__like-text">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}