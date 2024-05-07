import './pages/index.css'; // добавим импорт главного файла стилей
//import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation, validationConfig } from './components/validation.js';
import { getInitialCards, getProfileInfo, editProfile, editAvatarInfo, addNewCard, checkStatus } from './components/api.js'
import { renderLoading } from './components/utils.js'

//// Работа с карточками
const cardList = document.querySelector('.places__list');
const printError = (err) => console.log(err);
// Глобальный объект с данными профиля
const profileInfo = {};

const handleInitialCards = (initialCards) => {
  // Выведем карточки на страницу
  Array.from(initialCards).forEach((card) => {
    const cardObject = createCard(card, deleteCard, openCard, likeCard, profileInfo);
    cardList.append(cardObject);
  });
}

//// Получение данных профиля по API и вывод их на страницу
const profileInfoPrimary  = getProfileInfo().then(res => {
  return checkStatus(res);
});

//// Получение списка карточек по API
const initialCardsPrimary = getInitialCards().then(res => {
  return checkStatus(res);
});

Promise.all([ profileInfoPrimary, initialCardsPrimary ])
.then(() => {
  profileInfoPrimary.then((profileInfo) => {
      setProfileInfo(profileInfo);
      initialCardsPrimary.then(handleInitialCards, printError);
  }, printError);
}, printError);

/////////////////////////////
////////////////////////////
// Массив попап-окон
const popups = Array.from(document.querySelectorAll('.popup'));

// Слушатель закрытия каждого попапа по кликам на крестик и на оверлей
popups.forEach(popup => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) { 
      closeModal(popup);
    }
  });
});

/////////////////////////////
// Кнопка "Добавить карточку"
const addButton = document.querySelector('.profile__add-button');
// Попап добавления карточки
const addPopup = document.querySelector('.popup_type_new-card');
// Форма добавления новой карточки
const formNewCard = addPopup.querySelector('.popup__form'); 
// Находим поля формы добавления новой карточки
const nameNewCard = formNewCard.querySelector('.popup__input_type_card-name'); 
const linkNewCard = formNewCard.querySelector('.popup__input_type_url'); 

// Слушатель нажатия на кнопку "Добавить карточку"
addButton.addEventListener('click', function (evt) {
  formNewCard.reset();
  openModal(addPopup);
  // очистка ошибок валидации формы профиля
  clearValidation(formNewCard, validationConfig);
});

// Сохранение новой карточки
// Обработчик отправки формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
    evt.preventDefault(); 

    const buttonElement = evt.target.querySelector('.popup__button');

    renderLoading(true, buttonElement);

    addNewCard (nameNewCard.value, linkNewCard.value)
    .then((res) => {
      return checkStatus(res);
    })
    .then((result) => {
      // Вывод карточки на страницу
      const cardObject = createCard(result, deleteCard, openCard, likeCard, profileInfo);
      cardList.prepend(cardObject);
    })
    .then ((result) => {
      closeModal(addPopup);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, buttonElement);
    }) ;
}

// Слушатель отправки формы добавления новой карточки
formNewCard.addEventListener('submit', handleFormNewCardSubmit);

/////////////////////////////
//////// Работа с профилем
// Кнопка редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
// Попап редактирования профиля
const editPopup = document.querySelector('.popup_type_edit');
// Имя профиля в документе
const elemProfileTitle = document.querySelector('.profile__title');
// Описание профиля в документе
const elemProfileDescription = document.querySelector('.profile__description');
// Форма редактирования профиля
const formEdit = editPopup.querySelector('.popup__form');
// Находим поля формы редактирования профиля в DOM
const nameInput = formEdit.querySelector('.popup__input_type_name'); 
const jobInput = formEdit.querySelector('.popup__input_type_description'); 

// Аватар профиля
const profileAvatar = document.querySelector('.profile__image');
//const profileAvatarSvg = document.querySelector('.profile__image-edit-button');

// Попап редактирования аватара
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
// Форма редактирования аватара
const formEditAvatar = editAvatarPopup.querySelector('.popup__form');
// Поле на форме для ввода ссылки на аватара
const avatarInput = formEditAvatar.querySelector('.popup__input_type_url');

// Запись данных профиля на страницу
function setProfileInfo(profile) {
  elemProfileTitle.textContent = profile.name;
  elemProfileDescription.textContent = profile.about;
  profileAvatar.style.backgroundImage = `url(${profile.avatar})`;
  
  profileInfo._id = profile._id;
  profileInfo.name = profile.name;
  profileInfo.about = profile.about;
  profileInfo.avatar = profile.avatar;
}

//// Редактирование профиля
// Слушатель нажатия на кнопку редактирования профиля
editButton.addEventListener('click', function () {
  // Заполнение полей формы редактирования
  nameInput.value = elemProfileTitle.textContent;
  jobInput.value = elemProfileDescription.textContent;

  openModal(editPopup);

  // очистка ошибок валидации формы профиля
  clearValidation(formEdit, validationConfig);
});

//// Сохранение данных профиля
// Обработчик «отправки» формы редактирования данных профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault(); 

  const buttonElement = evt.target.querySelector('.popup__button');

  renderLoading(true, buttonElement);

  const name = nameInput.value;
  const job = jobInput.value;

  // Сохраним данные профиля
  editProfile(name, job)
  .then((res) => {
    return checkStatus(res);
  })
  .then((result) => {
    setProfileInfo(result);
  })
  .then ((result) => {
    closeModal(editPopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль   
  })
  .finally(() => {
    renderLoading(false, buttonElement);
  });
}

// Слушатель отправки формы редактирования данных профиля
formEdit.addEventListener('submit', handleFormProfileSubmit);

//// Редактирование аватара профиля 
// Слушатель нажатия на кнопку редактирования аватара
profileAvatar.addEventListener('click', function () {
  openModal(editAvatarPopup);

  // очистка ошибок валидации формы профиля
  clearValidation(formEditAvatar, validationConfig);
});


//// Сохранение аватара профиля
// Обработчик «отправки» формы редактирования аватара профиля
function handleFormAvatarSubmit(evt) {
  evt.preventDefault(); 

  const avatarLink = avatarInput.value;
  const buttonElement = evt.target.querySelector('.popup__button');

  renderLoading(true, buttonElement);

  editAvatarInfo(avatarLink)
  .then((res) => {
    return checkStatus(res);
  })
  .then((result) => {
    setProfileInfo(result);
  })
  .then ((result) => {
    closeModal(editAvatarPopup);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  })
  .finally(() => {
    renderLoading(false, buttonElement);
  });
}

// Слушатель отправки формы редактирования аватара профиля
formEditAvatar.addEventListener('submit', handleFormAvatarSubmit);

/////////////////////////////
// Попап с увеличенной картинкой
const imagePopup = document.querySelector('.popup_type_image');
// Тэги в попапе с картинкой и заголовком 
const image = imagePopup.querySelector('.popup__image');
const caption = imagePopup.querySelector('.popup__caption');

//Функция открытия попапа с увеличенным изображением
function openCard (imageSrc, captionText) {
  image.src = imageSrc; 
  image.alt = captionText;
  caption.textContent = captionText; 
  
  openModal(imagePopup);
}

// Вызовем функцию валидации
enableValidation(validationConfig); 
