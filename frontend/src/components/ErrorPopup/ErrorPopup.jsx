import closeIcon from "../../images/icon-close.svg";
import errorIcon from "../../images/Union.svg";

export default function ErrorPopup({ name, title, buttonSave, children, isOpen, onClose, onSubmit }) {
    return (
        // <div className={`popup popup_${name} ${isOpen && `popup_opened `}`} >
        <div className="popup popup_opened" >
            <div className="popup__container popup__container_errorOrDonePopup">
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
                <form className="form" name="formPopup" onSubmit={onSubmit}>
                    <img
                        className="popup__error"
                        src={errorIcon}
                        alt="крест в круге"
                    />
                    <h2 className="form__caption  form__caption_errorOrDonePopup">{title}</h2>
                </form>
            </div>
        </div>
    );
}