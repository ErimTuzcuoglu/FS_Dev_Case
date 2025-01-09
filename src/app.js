import express from 'express';
import mongoose from 'mongoose';
import config from './config/appConfig';
import expressConfig from './core/server/express';
import routes from './core/server/routes/index';
import mongoDbConnection from './core/database/mongoDB/connection';
// middlewares
import {errorHandlingMiddleware} from './core/server/middlewares/errorHandlingMiddleware';

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

// error handling middleware
app.use(errorHandlingMiddleware);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
  });
}
export default app;