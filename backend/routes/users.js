const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexpLink } = require('../utils/constants');

const {
  getUsers,
  getUser,
  getCurrentUser,
  patchUser,
  patchAvatar,
} = require('../controllers/users');

// Получение данных всех пользователей
router.get('/', getUsers);

// Получение данных текущего
router.get('/me', getCurrentUser);

// Получение данных конкретного пользователя по ID
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

// Обновление данных пользователя
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchUser);

// Замена аватара
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regexpLink),
  }),
}), patchAvatar);

module.exports = router;
