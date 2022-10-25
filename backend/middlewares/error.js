const { isCelebrateError } = require('celebrate');

module.exports = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (isCelebrateError(err)) {
    res.status(statusCode).json(err);
  } else {
    res.status(statusCode).json({ message: statusCode === 500 ? 'Внутренняя ошибка сервера' : message });
  }
  next();
});
