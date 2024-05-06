const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}; 

// Функция проверки наличия ошибок ввода в массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {  
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;

  })
}; 

// Функция отключения и включения кнопки, принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_submit_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_submit_inactive');
  }
};

// const toggleButtonState = (buttonElement, enabled) => {
//   // Если есть хотя бы один невалидный инпут
//   if (!enabled) {
//     // сделай кнопку неактивной
//     buttonElement.disabled = true;
//     buttonElement.classList.add('popup__button_submit_inactive');
//   } else {
//     // иначе сделай кнопку активной
//     buttonElement.disabled = false;
//     buttonElement.classList.remove('popup__button_submit_inactive');
//   }
// };

const isValid = (formElement, inputElement, buttonElement) => {
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
    // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage);

    // сделаем кнопку неактивной
    //toggleButtonState(buttonElement, false);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);

    //toggleButtonState(buttonElement, true);
  }
}; 


const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    //isValid(formElement, inputElement, buttonElement);
    //toggleButtonState(buttonElement);
    toggleButtonState(inputList, buttonElement);
    
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
      //toggleButtonState(buttonElement);

      
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, buttonElement);

    });
  });
}; 



export function enableValidation() {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

export function clearValidation(formElement, validationConfig) {
  //const errorSpan = formElement.querySelector('.popup__input-error');

  const inputList = Array.from(formElement.querySelector('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    isValid(formElement, inputElement, buttonElement);
  });

}

// очистка ошибок валидации вызовом clearValidation
//clearValidation(profileForm); //, validationConfig);