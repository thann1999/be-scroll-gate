export const dbConfig = () => ({
  HOST: process.env.DATABASE_HOST,
  PORT: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
});
