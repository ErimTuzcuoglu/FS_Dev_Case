export const responseMiddleware = (req, res, next) => {
  const messages = {
    200: 'Successful.',
    201: 'Created.',
    204: 'No content.',
    400: 'Bad request.',
    401: 'Unauthorized.',
    403: 'Forbidden.',
    404: 'Not found.',
    500: 'Internal server error.',
  };
  res.customResult = function (body, statusCode = res.statusCode, isSuccess) {
    const success = isSuccess ?? (statusCode < 400);
    const formattedResponse = {
      success,
      data: success ? body : null,
      message: success ? 'Successful.' : 'An error occurred.',
      error: success ? '' : (body?.message || messages[statusCode] || 'Unknown error'),
    };
    return res.status(statusCode ?? 200).json.call(this, formattedResponse);
  };
  next();
};
