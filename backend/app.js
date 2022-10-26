// Модули
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const { celebrate, errors, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const { regexpLink } = require('./utils/constants');

const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');

const errorHandler = require('./middlewares/error');

// Порт
const { PORT = 3000 } = process.env;

const NotFound = require('./errors/NotFound');

// Подключение базы данных
mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
// signin

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// reg
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexpLink),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// Роутинг
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

// Заглушка
app.use('/*', auth, (req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});
// Crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errors());
// app.use(errorLogger); // подключаем логгер ошибок

app.use(errorHandler());

app.listen(PORT);
