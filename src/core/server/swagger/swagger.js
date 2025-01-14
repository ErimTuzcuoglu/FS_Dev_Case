import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '@config/swagger';

const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default function swaggerDocs(app, config) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  if (config.swaggerDocsEnabled) {
    app.get('/', (req, res) => {
      res.redirect('/docs');
    });
  }
}