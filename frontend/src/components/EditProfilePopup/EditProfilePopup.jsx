// import PopupFormValidation from "../../utils/PopupFormValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React from "react";
import { useState, useContext, useEffect } from "react";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const currentUser = useContext(CurrentUserContext);
    // const { handleValidity } = PopupFormValidation()

    function handleChangeName(event) {
        setName(event.target.value)
    }

    function handleChangeDescription(event) {
        setDescription(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        onUpdateUser({
            name: name,
            about: description,
        })
    }

    useEffect(() => {
        if (isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name='redaction'
            title='Редактировать профиль'
            buttonSave='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                minLength={2}
                maxLength={40}
                type="text"
                name="username"
                id="username"
                className="form__input form__input_redaction form__input_kye_username"
                placeholder="Имя"
                required
                value={name || ""}
                onChange={handleChangeName}
            />
            <span className="form__input-error form__input-error_type_username" />
            <input
                minLength={2}
                maxLength={200}
                type="text"
                name="status"
                id="status"
                className="form__input form__input_redaction form__input_kye_status"
                placeholder="О себе"
                required
                value={description || ""}
                onChange={handleChangeDescription}
            // onChange={handleValidity}
            />
            <span className="form__input-error form__input-error_type_status" />
        </PopupWithForm>
    );
}