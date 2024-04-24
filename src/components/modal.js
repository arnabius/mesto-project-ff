export function openModal (popupWindow) {
  popupWindow.classList.add('popup_is-opened'); 

  // Слушатель закрытия попапа по Esc
  document.addEventListener('keydown', closeModalEsc);
}


export function closeModal (popupWindow) {
  popupWindow.classList.remove('popup_is-opened');

  // Удалим слушатель закрытия попапа по Esc
  document.removeEventListener('keydown', closeModalEsc);
}

  
// Функция закрытия попапа по нажатию Escape 
function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup); 
  }
} 
