import {config as dotenvConfig} from 'dotenv';
const path = require('path');
dotenvConfig({path: path.resolve(`${__dirname}/../..`, `.env.${process.env.NODE_ENV || 'development'}`)});

export default {
  port: parseInt(process.env.PORT) || 3000,
  mongo: {
    uri: process.env.DB_URL || 'mongodb://localhost:27017/FS_Dev_Case',
  },
  jwtSecret: process.env.JWT_SECRET,
  swaggerDocsEnabled: Boolean(process.env.SWAGGER_DOCS_ENABLED),
};
