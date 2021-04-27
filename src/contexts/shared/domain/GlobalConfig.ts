export default {
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: parseInt(process.env.DB_PORT),
  tz: process.env.TZ,
  mailApiKey: process.env.MAIL_API_KEY,
  mailDomain: process.env.MAIL_DOMAIN,
  environment: process.env.NODE_ENV,
};
