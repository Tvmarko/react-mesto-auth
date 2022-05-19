import { apiSettings } from "./utils.js";
class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _makeRequest = (url, options = {}) => {
      return fetch(url, options)
      .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
    }

    getProfileInfo() {
      return this._makeRequest(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
  } 

    getInitialCards() {
      return this._makeRequest(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
  } 

    editProfile(user) {
      return this._makeRequest(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: user.name,
          about: user.about
        })
      })
    }

   editAvatar(avatar) {
    return this._makeRequest(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
  }

    addCard(card) {
      return this._makeRequest(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: card.name,
          link: card.link
        })
      })
    }

    deleteCard(card) {
      return this._makeRequest(`${this._baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: this._headers
      })
    }

    handleLikeCardStatus(card, likeCardStatus) {
      return this._makeRequest(`${this._baseUrl}/cards/${card}/likes`, {
        method: (likeCardStatus ? 'PUT': 'DELETE'),
        headers: this._headers
      })
    }
 }
   
const api = new Api(apiSettings); 
export default api;