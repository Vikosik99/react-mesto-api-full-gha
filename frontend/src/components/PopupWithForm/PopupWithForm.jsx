import closeIcon from "../../images/icon-close.svg";

export default function PopupWithForm({ name, title, buttonSave, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen && `popup_opened `}`} >
      <div className="popup__container">
        <button
          type="button"
          className={`popup__button-close popup__button-close_${name}`}
          onClick={onClose}
        >
          <img
            className="popup__close"
            src={closeIcon}
            alt="крест"
          />
        </button>
        <form className="form" name={name} onSubmit={onSubmit}>
          <h2 className="form__caption">{title}</h2>
          {children}
          <button type="submit" className="form__button-save">{buttonSave}</button>
        </form>
      </div>
    </div>
  );
}