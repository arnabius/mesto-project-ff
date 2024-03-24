// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardItem, delFunction) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = cardItem['link'];
    cardElement.querySelector('.card__image').alt = cardItem['name'];
    cardElement.querySelector('.card__title').textContent = cardItem['name'];
    
    const delButton = cardElement.querySelector('.card__delete-button');

    delButton.addEventListener('click', () => {
        delFunction(delButton);
    });
    
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard (event){
    const cardItemDel = event.closest('.card');

    cardItemDel.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
    const cardObject = createCard(card, deleteCard);
    cardList.append(cardObject);
});
