class Api {
  constructor(options) {
    this._url = options.baseUrl;
    // this._headers = options.headers;
    // this._authorization = options.headers.authorization;
  }

  _checkRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(this._checkRes);
  }

  // Cоздание карточек с сервера

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(this._checkRes);
  }

  setUserInfo({ name, about }, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkRes);
  }

  setUserAvatar({ avatar }, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkRes);
  }

  createNewCard({ name, link }, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkRes);
  }

  //   лайк карточки
  changeLikeCardStatus(cardId, isLike, token) {
    let method = "DELETE";
    if (isLike) {
      method = "PUT";
    }
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: method,
      headers: {
        "Authorization": `Bearer ${token}`
      },
    }).then(this._checkRes);
  }

  deleteCard(id, token) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    }).then(this._checkRes);
  }
}

const api = new Api({
  baseUrl: "https://api.mestofull.vikosik99.nomoredomainsrocks.ru",
  // headers: {
  //   authorization: "b6c4512c-817a-42b9-b0f0-214f2963b61f",
  //   "Content-Type": "application/json",
  // },
});

export default api;
