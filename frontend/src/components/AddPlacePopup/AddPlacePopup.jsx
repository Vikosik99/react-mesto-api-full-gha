import CurrentUserContext from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import { useState, useEffect, useContext } from "react"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState("")
    const [link, setLink] = useState("")

    const currentUser = useContext(CurrentUserContext);

    function handleChangeName(event) {
        setName(event.target.value)
    }

    function handleChangeLink(event) {
        setLink(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        onAddPlace({
            name: name,
            link: link,
        })
    }

    useEffect(() => {
        if (isOpen) {
            setName("");
            setLink("");
        }
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name='card-add'
            title='Новое место'
            buttonSave='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                minLength={2}
                maxLength={30}
                type="text"
                name="placename"
                id="placename"
                className="form__input form__input_add form__input_kye_placename"
                placeholder="Название"
                required
                value={name || ""}
                onChange={handleChangeName}
            />
            <span className="form__input-error form__input-error_type_placename" />
            <input
                type="url"
                name="placelink"
                id="placelink"
                className="form__input form__input_add form__input_kye_placelink"
                placeholder="Ссылка на картинку"
                required
                value={link || ""}
                onChange={handleChangeLink}
            />
            <span className="form__input-error form__input-error_type_placelink" />
        </PopupWithForm>
    )
}