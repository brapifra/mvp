import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '.env.test.local') });

import 'contexts/register';
import { Container } from 'contexts/container';
import { DatabaseClient } from 'contexts/shared/domain/DatabaseClient';

afterAll(async () => {
  const client = Container.resolve<DatabaseClient>('DatabaseClient');
  await client.end();
});
