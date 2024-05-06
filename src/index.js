import './pages/index.css'; // добавим импорт главного файла стилей
//import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInitialCards, getProfileInfo, editProfile, editAvatarInfo, addNewCard, renderLoading } from './components/api.js'


//// Получение данных профиля по API и вывод их на страницу
getProfileInfo()
.then((result) => {
  setProfileInfo(result);
})
.catch((err) => {
  console.log(err); // выводим ошибку в консоль
});


//// Работа с карточками
const cardList = document.querySelector('.places__list');

getInitialCards()
.then((result) => {
  // Выведем карточки на страницу
  Array.from(result).forEach((card) => {
    const cardObject = createCard(card, deleteCard, openCard, likeCard, profileInfo);
    cardList.append(cardObject);
  });
})
.catch((err) => {
  console.log(err); // выводим ошибку в консоль
});


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
});

// Сохранение новой карточки
// Обработчик отправки формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
    evt.preventDefault(); 

    const buttonElement = evt.target.querySelector('.popup__button');

    renderLoading(true, buttonElement);

    addNewCard (nameNewCard.value, linkNewCard.value)
    .then((result) => {
      // Вывод карточки на страницу
      const cardObject = createCard(result, deleteCard, openCard, likeCard, profileInfo);
      cardList.prepend(cardObject);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
      renderLoading(false, buttonElement);
    }) ;

    closeModal(addPopup);
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

// Глобальный объект с данными профиля
const profileInfo = {};

// Запись данных профиля на страницу
function setProfileInfo(profile) {
  // Вставим новые значения с помощью textContent
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
  clearValidation(formEdit);
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
  //editProfile (name, job);

  // Вставим новые значения с помощью textContent
  //elemProfileTitle.textContent = name; //nameInput.value;
  //elemProfileDescription.textContent = job; //jobInput.value;

  closeModal(editPopup);

  editProfile(name, job)
  .then((result) => {
    setProfileInfo(result);
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
  // Заполнение полей формы редактирования
  //nameInput.value = elemProfileTitle.textContent;
  //jobInput.value = elemProfileDescription.textContent;

  openModal(editAvatarPopup);

  // очистка ошибок валидации формы профиля
  clearValidation(formEditAvatar);
});


//// Сохранение аватара профиля
// Обработчик «отправки» формы редактирования аватара профиля
function handleFormAvatarSubmit(evt) {
  evt.preventDefault(); 

  const avatarLink = avatarInput.value;
  const buttonElement = evt.target.querySelector('.popup__button');

  renderLoading(true, buttonElement);

  closeModal(editAvatarPopup);

  editAvatarInfo(avatarLink)
  .then((result) => {
    setProfileInfo(result);
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



///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
// Вызовем функцию
enableValidation(); 









