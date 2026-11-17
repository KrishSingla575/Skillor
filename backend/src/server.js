const app = require('./app');
const env = require('./config/env');

const server = app.listen(env.PORT, () => {
  console.log(`Skillor Backend Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  console.log(`Health check: http://localhost:${env.PORT}/api/health`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection! Shutting down server...', err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;
