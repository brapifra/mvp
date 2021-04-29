import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';
import GlobalConfig from 'contexts/shared/domain/GlobalConfig';
import {
  PostgresServerlessClient,
  PostgresServerlessClientConfig,
} from 'contexts/shared/infrastructure/PostgresServerlessClient';
import { DatabaseClient } from 'contexts/shared/domain/DatabaseClient';

container.register<PostgresServerlessClientConfig>(
  'PostgresServerlessClientConfig',
  {
    useValue: {
      host: GlobalConfig.dbHost,
      user: GlobalConfig.dbUser,
      password: GlobalConfig.dbPassword,
      port: GlobalConfig.dbPort,
      database: GlobalConfig.dbName,
      debug: GlobalConfig.environment === 'development',
    },
  }
);

container.register<DatabaseClient>(
  'DatabaseClient',
  {
    useClass: PostgresServerlessClient,
  },
  { lifecycle: Lifecycle.Singleton }
);
