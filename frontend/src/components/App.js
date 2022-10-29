//React компоненты
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'

//Родные компоненты
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';

//Контексты
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

//Api
import { api } from "../utils/Api.js";
import auth from "../utils/Auth.js"

// Иконки статуса
import successIcon from "../images/success-icon.svg"
import failureIcon from "../images/failure-icon.svg"
import { TranslationContext } from '../contexts/TranslationContext.js';

function App() {
  let history;
  history = useHistory();
  //Данные о пользователе
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [lang, setLang] = useState({})

  //Карты
  const [cards, setCards] = useState([]);

  //Раскрытая карта
  const [selectedCard, setSelectedCard] = useState({})

  //Стейты попапов
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Сообщение статуса 
  const [message, setMessage] = useState({});

  useEffect(() => {
    handleTokenValidation()
    if (loggedIn) {
      api.getAllData()
        .then(([data, user]) => {
          setCards(data)
          setCurrentUser(user)
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn])

  useEffect(() => {
    if(loggedIn) {
      history.push('/')
    }
  }, [loggedIn, history])

  // Открытие соответствующих попапов
  function replaceAvatar() {
    setAvatarPopupOpen(true)
  }

  function addPlace() {
    setAddPlacePopupOpen(true)
  }

  function openProfilePopup() {
    setProfilePopupOpen(true)
  }

  //Закрытие Попапов

  function closePopups() {
    setAvatarPopupOpen(false)
    setAddPlacePopupOpen(false)
    setProfilePopupOpen(false)
    setSelectedCard({})
    setIsInfoTooltipPopupOpen(false)
    //console.log("lala")
  }
  function openCardPopup(card) {
    setSelectedCard({ src: card.link, alt: card.name, opened: true });
  }

  //Установка данных пользователей
  function handleUpdateUser({name, about}) {
    setIsSubmitting(true)
    api.setUserInfo({name, about}).then((user) => {
      setCurrentUser(user)
    }).then(() => closePopups()).catch((err) => {
      console.log(err);
    }).finally(() => {
      setIsSubmitting(false)
    });
  }

  // Добавление места
  function handleAddPlaceSubmit({name, link}) {
    setIsSubmitting(true)
    api.createCard({name, link}).then((newCard) => {
      setCards([newCard, ...cards]);
    }).then(() => closePopups()).catch((err) => {
      console.log(err);
    }).finally(() => {
      setIsSubmitting(false)
    });
  }

  //Аптейт аватара
  function handleAvatarUpdate({avatar}) {
    setIsSubmitting(true)
    api.setUserAvatar(avatar)
      .then((user) => {
        setCurrentUser(user)
    })
      .then(() => closePopups())
      .catch((err) => {
      console.log(err);
    }).finally(() => {
      setIsSubmitting(false)
    });
  }
  // Лайканье

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err);
    });
  }
  
  // Удаление карты
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }



  //Токен
  function handleTokenValidation() {
    const token = localStorage.getItem("token")
    if (token) {
      auth
        .tokenValid(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setUserEmail(res.email)
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  }

  // Регистрация 
  function handleRegistration(password, email) {
    auth
      .register(password, email)
      .then(res => {
        if (res) {
          setMessage({
            imgInfo: successIcon,
            text: 'Вы успешно зарегистрировались!'
          })
          history.push('/sign-in')
        }
      })
      .catch(setMessage({
        imgInfo: failureIcon,
        text: 'Что-то пошло не так! Попробуйте ещё раз.'
      }))
      .finally(() => setIsInfoTooltipPopupOpen(true))
  }

  //Вход по логину
  function handleLogin(password, email) {
    auth
      .login(password, email)
      .then(res => {
        if (res.token) {
          localStorage.setItem('token', res.token)
          setUserEmail(email)
          setLoggedIn(true)
        } 
      })
      .catch(() => {
        setMessage({
        imgInfo: failureIcon,
        text: 'Что-то пошло не так! Попробуйте ещё раз.'
      })
      setIsInfoTooltipPopupOpen(true)})
  }

  //Выход из аккаунта

  function handleSignOut() {
    setLoggedIn(false)
    localStorage.removeItem('token')
    history.push('/sign-in')
  }

  /*
  let currentUserWithLang = currentUser.push(lang)
  console.log(currentUserWithLang)
  */

  return (
    <TranslationContext.Provider value={""}>
      <CurrentUserContext.Provider value={currentUser}>

        <Header onSignOut={handleSignOut} userEmail={userEmail} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            replaceAvatar={replaceAvatar}
            addPlace={addPlace}
            openProfilePopup={openProfilePopup}
            closePopups={closePopups}
            onCardClick={openCardPopup}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} />

          <Route path="/sign-up">
            <Register onRegistration={handleRegistration} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <EditProfilePopup
          isOpen={isProfilePopupOpen}
          isSubmitting={isSubmitting}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isAvatarPopupOpen}
          isSubmitting={isSubmitting}
          onClose={closePopups}
          onUpdateAvatar={handleAvatarUpdate} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isSubmitting={isSubmitting}
          onClose={closePopups}
          onSubmitPlace={handleAddPlaceSubmit} />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closePopups}
          imgInfo={message.imgInfo}
          textInfo={message.text}
        />


        <ImagePopup
          card={selectedCard}
          onClose={closePopups}></ImagePopup>

        <Footer />

        <script type="module" src="./pages/index.js"></script>
      </CurrentUserContext.Provider>
      </TranslationContext.Provider>
  );
}

export default App;
