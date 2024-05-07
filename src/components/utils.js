// Отрисовка процесса сохранения
export function renderLoading(isLoading, buttonElement) {
    if (isLoading) {
      buttonElement.oldTextContent = buttonElement.textContent;
      buttonElement.textContent = 'Сохранение...';
    }
    else {
      buttonElement.textContent = buttonElement.oldTextContent; 
    }
  }