import { openModal } from './modal.js';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// @todo: Функция создания карточки
export function createCard(cardItem, delFunction, openFunction, likeFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardCaption = cardElement.querySelector('.card__title');
    
    cardImage.src = cardItem['link'];
    cardImage.alt = cardItem['name'];
    cardCaption.textContent = cardItem['name'];
    
    const delButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    // Колбэк по кнопке удаления карточки
    delButton.addEventListener('click', () => {
      delFunction(delButton);
    });
      
    // Колбэк по клику на карточку
    cardImage.addEventListener('click', () => { 
        openFunction(cardImage, cardCaption);
    });
    //function(evt) {
         
    likeButton.addEventListener('click', likeFunction);
  
    return cardElement;
  }
  
  // @todo: Функция удаления карточки
  export function deleteCard (event){
    const cardItemDel = event.closest('.card');
  
    cardItemDel.remove();
  }

  export function openCard (cardImage, cardCaption) {
    // Попап с увеличенной картинкой
    const imagePopup = document.querySelector('.popup_type_image');
    // Тэги в попапе с картинкой и заголовком 
    const image = imagePopup.querySelector('.popup__image');
    const caption = imagePopup.querySelector('.popup__caption');

    image.src = cardImage.src;
    caption.textContent = cardCaption.textContent;
    
    openModal(imagePopup);
  }

  export function likeCard () {
    event.target.classList.toggle('card__like-button_is-active');
  }