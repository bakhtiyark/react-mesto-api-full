const allowedCors = ['http://localhost:3000',
  'http://api.bakhtiyarkpr.nomoredomains.icu',
  'http://bakhtiyarkpr.nomoredomains.icu'];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Headers', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
module.exports = cors;
