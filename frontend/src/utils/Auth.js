class Auth {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl
    }
    _errorCheck = res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(new Error("Ошибка " + res.status))
    }
  
    register(password, email) {
      return fetch(
        `${this._baseUrl}/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            password,
            email
          })
        }
      )
      .then(res => this._errorCheck(res))
    }
  
    login(password, email) {
      return fetch(
        `${this._baseUrl}/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            password,
            email
          })
        }
      )
      .then(res => this._errorCheck(res))
    }
  
    tokenValid(token) {
      return fetch(
        `${this._baseUrl}/users/me`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )
      .then(res => this._errorCheck(res))
    }
  }
  
  const auth = new Auth({
    baseUrl: "https://auth.nomoreparties.co"
  })
  
  export default auth