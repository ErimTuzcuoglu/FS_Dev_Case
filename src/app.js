import express from 'express';
import mongoose from 'mongoose';
import config from '@config/appConfig';
import expressConfig from '@core/server/express';
import routes from '@core/server/routes/index';
import mongoDbConnection from '@core/database/mongoDB/connection';
// middlewares
import {errorHandlingMiddleware} from '@core/server/middlewares/errorHandlingMiddleware';
import { notFound } from '@core/server/middlewares/notFound';

const app = express();
// express.js configuration (middlewares etc.)
expressConfig(app, config);

// DB configuration and connection create
if (process.env.NODE_ENV !== 'test') {
  mongoDbConnection(mongoose, config, {
    connectTimeoutMS: 1000,
  }).connectToMongo();
}

// routes for each endpoint
app.use('/api', routes);

app.use(notFound);
// error handling middleware
// Important: Never remove next parameter even if it is not used.
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  errorHandlingMiddleware(error, req, res);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
}
export default app;