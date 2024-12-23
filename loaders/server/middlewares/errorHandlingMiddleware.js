export const errorHandlingMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const formattedResponse = {
    success: false,
    data: null,
    message: 'An error occurred.',
    error: err.message || 'Unknown error',
  };
  res.status(err.status || 500).json(formattedResponse);
};
