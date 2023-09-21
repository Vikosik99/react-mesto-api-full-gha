import closeIcon from "../../images/icon-close.svg";
import doneIcon from "../../images/Union-Done.svg";

export default function DonePopup({ name, title, buttonSave, children, isOpen, onClose, onSubmit }) {
    return (
        // <div className={`popup popup_${name} ${isOpen && `popup_opened `}`} >
        <div className="popup popup_opened" >
            <div className="popup__container popup__container_errorOrDonePopup popup__container_donePopup">
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
                <img
                    className="popup__error"
                    src={doneIcon}
                    alt="крест в круге"
                />
                <h2 className="form__caption  form__caption_errorOrDonePopup form__caption_donePopup">{title}</h2>
            </div>
        </div>
    );
}