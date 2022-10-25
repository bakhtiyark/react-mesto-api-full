//  Импорт модели
const Card = require('../models/card');

// Ошибки
const NotFound = require('../errors/NotFound');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ValidationError = require('../errors/ValidationError');

//  Создание карты
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с указанным _id не найдена.');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

//  Получить все карты
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

//  Удалить карточку
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFound('Карточка не найдена'))
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        card.delete()
          .then(() => res.status(200).json({ message: 'Карточка удалена' }))
          .catch(next);
      } else { throw new UnauthorizedError('Удалять можно только свои карты.'); }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound('Некорректный ID'));
      } else {
        next(err);
      }
    });
};

// Поставить лайк карточке
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => { throw new NotFound('Карточка с указанным ID не найдена'); })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound('Карточка с указанным ID не найдена'));
      } else {
        next(err);
      }
    });
};
// Удаления лайка с карты
const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => { throw new NotFound('Карточка с указанным ID не найдена'); })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFound('Карточка с указанным ID не найдена'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  removeLike,
};
