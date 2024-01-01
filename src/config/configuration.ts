import { getDatabaseConfig } from './database.config';

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: getDatabaseConfig(),
});
