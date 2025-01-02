export default {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FS_Dev_Case API',
      description: 'API endpoints for FS Dev case project services documented on swagger',
      contact: {
        name: 'Erim Tuzcuoglu',
        email: 'erimtuzcuoglu@gmail.com',
        url: 'https://github.com/ErimTuzcuoglu/FS_Dev_Case',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/`,
        description: `${process.env.NODE_ENV} Server`,
      },
    ],
  },
  // looks for configuration in specified directory
  apis: [(require('path')).join(__dirname, '../api/docs', '*')],
};