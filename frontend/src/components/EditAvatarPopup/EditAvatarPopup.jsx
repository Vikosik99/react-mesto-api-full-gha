import { useRef } from "react"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import { useState, useEffect, useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const input = useRef()
    const currentUser = useContext(CurrentUserContext);


    const [avatar, setAvatar] = useState("")

    function handleChangeAvatar(event) {
        setAvatar(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        onUpdateAvatar({ avatar: input.current.value })
    }

    useEffect(() => {
        if (isOpen) {
            setAvatar("");
        }
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name='change-avatar'
            title='Обновить аватар'
            buttonSave='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}

        >
            <input
                ref={input}
                type="url"
                name="avatarlink"
                id="avatarlink"
                className="form__input form__input_change-avatar form__input_kye_avatarlink"
                placeholder="Ссылка на картинку"
                required
                value={avatar || ""}
                onChange={handleChangeAvatar}
            />
            <span className="form__input-error form__input-error_type_avatarlink"></span>
        </PopupWithForm>
    )
}