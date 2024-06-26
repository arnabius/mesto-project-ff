const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    authorization: 'b8b29966-7d93-4632-8883-010a6bd8e2e6',
    'Content-Type': 'application/json'
  }
}


function checkStatus (res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка запроса по API: ${res.status}`);
}

// Получение массива карточек
export function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    return checkStatus(res);
  }); 
} 

// Сохранение карточки 
export function addNewCard (nameCard, linkCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  })
  .then(res => {
    return checkStatus(res);
  }); 
}

// Получение данных профиля
export function getProfileInfo () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    return checkStatus(res);
  }); 
} 

// Сохранение данных профиля
export function editProfile (nameInfo, aboutInfo) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInfo,
      about: aboutInfo
    })
  })
  .then(res => {
    return checkStatus(res);
  }); 
}

// Сохранение данных аватара профиля
export function editAvatarInfo (avatarInfo) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInfo
    })
  })
  .then(res => {
    return checkStatus(res);
  }); 
}

// Удаление карточки
export function delCard (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return checkStatus(res);
  }); 
} 

// Постановка/удаление лайка
export function toggleLikeCard (cardId, isLike) {
  const method = (isLike === true) ? 'PUT' : 'DELETE';

  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers
  })
  .then(res => {
    return checkStatus(res);
  }); 
} 


