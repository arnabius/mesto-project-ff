import { popups } from '../index.js'

// Функция поиска открытого попапа и его закрытия
export function closeModal () {
    const openedPopup = popups.find(function (item) {
    if (item.classList.contains('popup_is-opened')) {
        return item;
      }
    });
  
    if (openedPopup !== undefined) { 
      openedPopup.classList.remove('popup_is-opened');

      const openedForm = openedPopup.querySelector('.popup__form');
      
      if (openedForm !== null) {
        openedForm.reset();
      }

      // Удалим слушатель закрытия попапа по клику на оверлей
      //openedPopup.removeEventListener('click', closeModal); 
      // Удалим слушатель закрытия попапа по Esc
      document.removeEventListener('keydown', closeModalEsc);
    }
  }
  
  // Функция закрытия попапа по нажатию Escape
  export function closeModalEsc () {
    if (event.key === "Escape" || event.keyCode === 27) {
      closeModal();
    }
  }
  
  export function openModal (popupWindow) {
    popupWindow.classList.add('popup_is-opened'); 
    // Слушатель закрытия попапа по клику на оверлей
    //popupWindow.addEventListener('click', closeModal); 

    // Слушатель закрытия попапа по Esc
    document.addEventListener('keydown', closeModalEsc);
  }
  