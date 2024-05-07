import { delCard, toggleLikeCard, checkStatus } from '../components/api.js'

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// Функция создания карточки
export function createCard(cardItem, delFunction, openFunction, likeFunction, profile) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardCaption = cardElement.querySelector('.card__title');
  
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardCaption.textContent = cardItem.name;
  cardElement._id = cardItem._id;
  cardElement.owner_id = cardItem.owner._id;

  const delButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  //// Покажем/спрячем кнопку удаления + повесим слушатель клика
  if (profile._id === cardElement.owner_id) {
    // Колбэк по кнопке удаления карточки
    delButton.addEventListener('click', () => {
      delFunction(delButton);
    });

    delButton.classList.remove('card__button-hidden');
  }
  else {
    delButton.classList.add('card__button-hidden');
  }
  
  //// Лайки
  // Слушатель кнопки лайка
  likeButton.addEventListener('click', likeFunction);

  // Есть ли на карточке мой лайк
  const hasMyLike = cardItem.likes.some((item) => {
    return item._id === profile._id;
  });

  // Проставим карточке мой лайк
  if (hasMyLike) {
    showMyLike(cardElement);
  }
  // Проставим кол-ко лайков
  setLikeQuantityCard(cardElement, cardItem.likes.length);

  //// Колбэк по клику на карточку
  cardImage.addEventListener('click', () => { 
      openFunction(cardItem.link, cardItem.name);
  });

  return cardElement;
}
  
// Функция удаления карточки
export function deleteCard (event){
  const cardItemDel = event.closest('.card');

  delCard(cardItemDel._id)
  .then((res) => {
    return checkStatus(res);
  })
  .then((result) => {
    cardItemDel.remove();
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
}

// Функция простановки/удаления лайка при клике
function setLikeCard(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');

  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция отображения моего лайка на карточке при загрузке карточки
function showMyLike(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');

  likeButton.classList.add('card__like-button_is-active');
}

// Функция отображения количества лайков
function setLikeQuantityCard(cardElement, likeQuantity) {
  const likeSpan = cardElement.querySelector('.card__like-quantity');
  const cardDescription = cardElement.querySelector('.card__description');
  
  if (likeQuantity > 0) {
    cardDescription.classList.add('card__description-liked');
    likeSpan.textContent = likeQuantity;
  }
  else {
    cardDescription.classList.remove('card__description-liked');
    likeSpan.textContent = '';
  }
}

// Функция нажатия на кнопку лайка
export function likeCard (event) {
  const cardElement = event.target.closest('.card');
  const isLike = (event.target.classList.contains('card__like-button_is-active')) ? false : true;

  toggleLikeCard(cardElement._id, isLike)
  .then((res) => {
    return checkStatus(res);
  })
  .then((result) => {
    setLikeCard(cardElement);
    setLikeQuantityCard(cardElement, result.likes.length);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
}
