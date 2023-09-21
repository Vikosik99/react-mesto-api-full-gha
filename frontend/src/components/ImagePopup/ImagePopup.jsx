import closeIcon from "../../images/icon-close.svg";
export default function ImagePopup({card, onClose}) {
  const name = card ? card.name : '';
  const link = card ? card.link : '#';
  return (      
    <div className={`popup popup_open-size ${card && 'popup_opened'} `}>
      <div className="popup__container popup__container_open-size">
        <button
          type="button"
          className="popup__button-close popup__button-close_open-size"
          onClick={onClose}
        >
        <img
          className="popup__close"
          src={closeIcon}
          alt="крест"
        />
        </button>
        <img 
          className="popup__element-img" 
          src={link} 
          alt={name}/>
        <h2 className="popup__element-text">{name}</h2>
      </div>
    </div>
  );
}