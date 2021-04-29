import GlobalConfig from '../domain/GlobalConfig';
import { createDb, migrate } from 'postgres-migrations';

export async function migratePostgresDatabase(
  migrationsPath: string
): Promise<void> {
  // eslint-disable-next-line no-console
  console.log('\nRunning migrations from: ', migrationsPath, '\n');

  const dbConfig = {
    database: GlobalConfig.dbName,
    user: GlobalConfig.dbUser,
    password: GlobalConfig.dbPassword,
    host: GlobalConfig.dbHost,
    port: GlobalConfig.dbPort,
  };

  await createDb(GlobalConfig.dbName, dbConfig);
  await migrate(dbConfig, migrationsPath);
}
