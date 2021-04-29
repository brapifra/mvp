import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '.env.test.local') });

import { migratePostgresDatabase } from './src/contexts/shared/infrastructure/migratePostgresDatabase';

export default async (): Promise<void> => {
  await migratePostgresDatabase(
    join(__dirname, 'src/contexts/shared/infrastructure/postgresMigrations')
  );
  await migratePostgresDatabase(join(__dirname, 'test/postgresMigrations'));
};
