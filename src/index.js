import './pages/index.css'; // добавим импорт главного файла стилей
import { initialCards } from './cards.js'
import { createCard, deleteCard, likeCard } from './components/card.js'
import { openModal, closeModal } from './components/modal.js'

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const cardObject = createCard(card, deleteCard, openCard, likeCard);
  cardList.append(cardObject);
});


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
// Обработчик «отправки» формы добавления новой карточки
function handleFormNewCardSubmit(evt) {
    evt.preventDefault(); 

    const cards = {
      name: nameNewCard.value,
      link: linkNewCard.value,
    } 

    const cardObject = createCard(cards, deleteCard, openCard, likeCard);
    cardList.prepend(cardObject);

    closeModal(addPopup);
}

// Слушатель отправки формы добавления новой карточки
formNewCard.addEventListener('submit', handleFormNewCardSubmit);


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

// Слушатель нажатия на кнопку редактирования профиля
editButton.addEventListener('click', function () {
  // Заполнение полей формы редактирования
  nameInput.value = elemProfileTitle.textContent;
  jobInput.value = elemProfileDescription.textContent;

  openModal(editPopup);
});

// Сохранение данных профиля
// Находим поля формы попапа в DOM
const nameInput = formEdit.querySelector('.popup__input_type_name'); 
const jobInput = formEdit.querySelector('.popup__input_type_description'); 

// Обработчик «отправки» формы редактирования данных профиля
function handleFormProfileSubmit(evt) {
    evt.preventDefault(); 

    // Вставим новые значения с помощью textContent
    elemProfileTitle.textContent = nameInput.value;
    elemProfileDescription.textContent = jobInput.value;

    closeModal(editPopup);
}

// Слушатель отправки формы редактирования данных профиля
formEdit.addEventListener('submit', handleFormProfileSubmit);


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
