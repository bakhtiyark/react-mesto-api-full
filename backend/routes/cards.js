const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexpLink } = require('../utils/constants');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  removeLike,
} = require('../controllers/cards');

// Получение данных всех карточек
router.get('/', getCards);

// Создание карточки
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required(true).pattern(regexpLink),
  }),
}), createCard);

// Удаление карточки
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

// Лайканье карточки
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

// Снятие лайка с карточки
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), removeLike);

module.exports = router;
