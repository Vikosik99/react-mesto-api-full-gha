// export default function NLR({ name, title, buttonSave, children, isOpen, onClose, onSubmit }) {
//     return (
//         <div className="checkIn" >
//             <div className="checkIn__container">
//                 <form className="form form_checkIn" name="formPopup" onSubmit={onSubmit}>
//                     <h2 className="form__caption form__caption_checkIn">{title}</h2>
//                     {children}
//                     <button type="submit" className="form__button-save form__button-save_checkIn">{buttonSave}</button>
//                     <button type="submit" className="form__button form__button_checkIn">Уже зарегистрированы? Войти</button>
//                 </form>
//             </div>
//         </div>
//     );
// }