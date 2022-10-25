export class Api {
  constructor({ baseUrl, token }) {
    this._url = baseUrl
    this._token = token
  }

  // Проверка на ошибку
  _errorCheck = res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error("Ошибка " + res.status))
  }

  //Получение всех данных
  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  //Получение карт с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`,
      {
        headers: this._token
      })
      .then(res => this._errorCheck(res));
  }

  //Добавление карт
  createCard(card) {
    return fetch(`${this._url}/cards`,
      {
        method: 'POST',
        headers: this._token,
        body: JSON.stringify({
          name: card.name,
          link: card.link
        })
      }).then(res => this._errorCheck(res))
  }

  //Получение данных о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._token,
    })
      .then(res => this._errorCheck(res));
  }

  //Обновление пользователя
  setUserInfo(data) {
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: this._token,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      }).then(res => this._errorCheck(res))
  }
  //Установка аватара
  setUserAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._token,
        body: JSON.stringify(link)
      }).then(res => this._errorCheck(res))
  }

  //Комбинированный метод для лайканья/снятия лайка
  changeLikeCardStatus(id, state){
    return fetch(`${this._url}/cards/${id}/likes`,
    {
      method: (state) ? "PUT" :'DELETE',
      headers: this._token
    }).then(res => this._errorCheck(res))
  }

  //Удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._token
    }).then(this._errorCheck).catch(err => console.log(err))
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  token: {
    authorization: "c4df37c2-ee37-468d-b548-ff18699e058a",
    'Content-Type': 'application/json'
  }
})