const ApiError = require('../utils/ApiError');

const validate = ({ body, params }) => (req, _res, next) => {
  if (body) {
    const { error, value } = body.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      return next(new ApiError(400, error.details.map((item) => item.message).join(', ')));
    }
    req.body = value;
  }

  if (params) {
    const { error, value } = params.validate(req.params, { abortEarly: false, stripUnknown: true });
    if (error) {
      return next(new ApiError(400, error.details.map((item) => item.message).join(', ')));
    }
    req.params = value;
  }

  return next();
};

module.exports = validate;
