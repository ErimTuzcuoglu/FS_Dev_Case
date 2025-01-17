import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import {responseMiddleware} from '../middlewares/initial/responseMiddleware';
import swaggerDocs from './swagger';

export default function expressConfig(app, config) {
  // security middleware
  app.use(helmet());

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://some-accepted-origin');
    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-type, Userization, Cache-control, Pragma',
    );
    // Pass to next layer of middleware
    next();
  });
  app.use(morgan('combined'));
  app.use(responseMiddleware);
  swaggerDocs(app, config);
  // graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    console.log('Express app closed.');
    process.exit(0);
  });
}