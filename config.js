require('dotenv').config({ path: './secret.env' });

module.exports = {
  node: {
    env: process.env.NODE_ENV || 'dev',
  },
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3535,
  },
  postgres: {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'signum',
    password: process.env.DB_PASS || 'admin',
    port: process.env.DB_PORT || 5432,
  },
  jwt: {
    check: process.env.JWT_CHECK === 'true',
    secretKey: process.env.JWT_SECRET_KEY || 'any_secret',
  },
  log: {
    file: 'app.log',
  },
};
