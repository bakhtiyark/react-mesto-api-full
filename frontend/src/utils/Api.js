export class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl
    this._headers = headers
  }
  _getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      ...this._headers,
    };
  }

  // Проверка на ошибку
  /* _errorCheck = res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error("Ошибка " + res.status))
  }
  */

  //Получение всех данных
  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  //Получение карт с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`,
      {
        headers: this._getHeaders(),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  //Добавление карт
  createCard(card) {
    return fetch(`${this._url}/cards`,
      {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
          name: card.name,
          link: card.link
        })
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  //Получение данных о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._getHeaders(),
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => console.log(err));;
  }

  //Обновление пользователя
  setUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify({
          name:name,
          about:about
        })
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }
  
  //Установка аватара
  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._getHeaders(),
        body: JSON.stringify({avatar})
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }

  //Комбинированный метод для лайканья/снятия лайка
  changeLikeCardStatus(id, state){
    return fetch(`${this._url}/cards/${id}/likes`,
    {
      method: state ? 'DELETE': "PUT" ,
      headers: this._getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => console.log(err));
  }
  //Удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders()
    }).then(this._errorCheck).catch(err => console.log(err))
  }
}

export const api = new Api({
  baseUrl: 'https://api.bakhtiyarkpr.nomoredomains.icu',
  headers: {
    "Content-Type": "application/json",
  }
})