// Модули
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// env
const { JWT_SECRET, NODE_ENV } = process.env;

// Ошибки
const AuthorizationError = require('../errors/AuthorizationError');
const NotFound = require('../errors/NotFound');
const ValidationError = require('../errors/ValidationError');

// Коды
const {
  REGISTERED_ERROR,
} = require('../utils/constants');

// bcrypt-linked
const salt = 10;

// Получить данные всех юзеров
const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};
// Создание юзера
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, salt)
    .then((hash) => {
      User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      })
        .then(({
          name, about, _id, avatar, createdAt, email,
        }) => res.send({
          name, about, _id, avatar, createdAt, email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            res.status(REGISTERED_ERROR).json({ message: 'Пользователь уже существует' });
          } else if (err.name === 'ValidationError') {
            next(new ValidationError('Неверный логин или пароль'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

// GET ME
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new ValidationError('Пользователь не найден'))
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Получение конкретного пользователя /users/:userId
const getUser = (req, res, next) => {
  User.findById(req.params.userId).then((user) => {
    if (!user) {
      throw new NotFound('Пользователь не найден');
    }
    res.send({ data: user });
  }).catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFound('Пользователь не найден'));
    } else {
      next(err);
    }
  });
};

// Обновление данных пользователя
const patchUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new ValidationError('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

// Обновление аватара
const patchAvatar = (req, res, next) => {
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { avatar: req.body.avatar }, { new: true, runValidators: true })
    .orFail(new NotFound('Пользователь не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};
// Логин
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthorizationError('Неверный логин или пароль'));
      }
      return bcrypt.compare(password, user.password, (err, isValidPassword) => {
        if (!isValidPassword) {
          return next(new AuthorizationError('Неверный логин или пароль'));
        }
        const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'placeholder'}`, { expiresIn: '7d' });
        return res.status(200).send({ token });
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  patchUser,
  patchAvatar,
  login,
  getCurrentUser,
};
