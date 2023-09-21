import { useState } from "react"

export default function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }
    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        onLogin({
            email: email,
            password: password
        });
    }

    return (
        <div className="checkIn" >
            <div className="checkIn__container">
                <form className="form form_checkIn" name="formPopup" onSubmit={handleSubmit}>
                    <h2 className="form__caption form__caption_checkIn">Вход</h2>
                    <div className="form__imputs">
                        <input
                            minLength={2}
                            maxLength={30}
                            type="email"
                            name="email"
                            className="form__input form__input_checkIn form__input_kye_Email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={handleChangeEmail}
                        />
                        <span className="form__input-error form__input-error_type_Email" />
                        <input
                            minLength={3}
                            maxLength={10}
                            type="password"
                            name="password"
                            className="form__input form__input_checkIn form__input_kye_password"
                            placeholder="Пароль"
                            required
                            value={password}
                            autoComplete="current-password"
                            onChange={handleChangePassword}
                        />
                        <span className="form__input-error form__input-error_type_password" />
                    </div>
                    <button type="submit" className="form__button-save form__button-save_checkIn">Войти</button>
                </form>
            </div>
        </div>
    );
}
