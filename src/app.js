import express from 'express';
import mongoose from 'mongoose';
import config from './config/appConfig';
import expressConfig from './core/server/express';
import routes from './core/server/routes/index';
import mongoDbConnection from './core/database/mongoDB/connection';
import socket from './api/socket/socket';
// middlewares
import { errorHandlingMiddleware } from './core/server/middlewares/errorHandlingMiddleware';

const app = express();
const router = express.Router();
// express.js configuration (middlewares etc.)
expressConfig(app, config);

// DB configuration and connection create
if (process.env.NODE_ENV !== "test") {
    mongoDbConnection(mongoose, config, {
        connectTimeoutMS: 1000
    }).connectToMongo();
}

// routes for each endpoint
routes(app, router);

// error handling middleware
app.use(errorHandlingMiddleware);

if (process.env.NODE_ENV !== 'test') {
    app.listen(config.port, () => {
        console.log(`Server is listening on port ${config.port}`);
    });
}
export default app;