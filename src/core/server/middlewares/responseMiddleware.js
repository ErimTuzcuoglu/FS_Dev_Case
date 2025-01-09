export const responseMiddleware = (req, res, next) => {
  res.customResult = function (body, statusCode = res.statusCode, isSuccess) {
    const success = isSuccess ?? (statusCode < 400);
    const formattedResponse = {
      success,
      data: success ? body : null,
      message: success ? 'Successful.' : 'An error occurred.',
      error: success ? null : body.message || 'Unknown error',
    };
    return res.status(statusCode ?? 200).json.call(this, formattedResponse);
  };
  next();
};
