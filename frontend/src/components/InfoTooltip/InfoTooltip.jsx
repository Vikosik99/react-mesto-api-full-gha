import closeIcon from "../../images/icon-close.svg";

export default function InfoTooltip({ name, isOpen, onClose, isStatus }) {
    return (
        <div className={`popup popup_${name} ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container popup__container_errorOrDonePopup">
                <div className={`popup__errorOrDonePopup ${isStatus ? "popup__errorOrDonePopup_done" : "popup__errorOrDonePopup_error"}`}></div>
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
                <h2 className="form__caption  form__caption_errorOrDonePopup">{isStatus
                    ? "Вы успешно зарегистрировались!"
                    : "Что-то пошло не так! Попробуйте еще раз"}</h2>

            </div>
        </div>
    );
}
