export const errorHandlingMiddleware = (err, req, res) => {
  console.error(err.stack);
  res.customResult(err, err.status || 500, false);
};
