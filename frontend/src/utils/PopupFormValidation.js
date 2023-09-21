import { useState } from "react";

export default function PopupFormValidation() {
  // Отвечает за конкретные вэлью импутов и добавляет имена импутов
  const [valuesName, setValuesName] = useState({});

  // Отвечает за вывод ошибок при вводе в импуты
  const [errorsMessage, setErrorsMessage] = useState({});

  // Отвечает за проверку валидности конктерного импута
  const [validityInput, setValidityInput] = useState({});

  // Отвечает за проверку валидности импутов всей формы
  const [validityAllForm, setValidityAllForm] = useState(false);

  console.log(setValidityAllForm);

  function handleValidity(event) {
    // Ответ: Имя импута в котором ввод
    const name = event.target.name;

    // Ответ: Текст вводимый в импуты
    const value = event.target.value;

    // Ответ: true/false на валидность импута
    const valid = event.target.validity.valid;

    // Ответ: Текст под чертой чего не хватает для валидности импута
    const validationMessage = event.target.validationMessage;

    // Ответ: выводит форму в которой ввод происходит
    const form = event.target.form;

    setValuesName((valuesNameBefore) => {
      return { ...valuesNameBefore, [name]: value };
    });

    setValidityInput((validityInputBefore) => {
      return { ...validityInputBefore, [name]: valid };
    });

    setErrorsMessage((errorsMessageBefore) => {
      return { ...errorsMessageBefore, [name]: validationMessage };
    });

    setValidityAllForm(form.checkValidity());
  }

  return {
    valuesName,
    validityInput,
    errorsMessage,
    validityAllForm,
    handleValidity,
  };
}
