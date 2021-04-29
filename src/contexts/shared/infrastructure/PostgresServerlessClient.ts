import { singleton, inject } from 'tsyringe';
import { DatabaseClient } from 'contexts/shared/domain/DatabaseClient';
import ServerlessClient from 'serverless-postgres';

export interface PostgresServerlessClientConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  debug: boolean;
  port: number;
}

@singleton()
export class PostgresServerlessClient implements DatabaseClient {
  private client: ServerlessClient;
  private isConnected = false;
  private hasConnectedAtLeastOnce = false;

  constructor(
    @inject('PostgresServerlessClientConfig')
    config: PostgresServerlessClientConfig
  ) {
    this.client = new ServerlessClient(config);
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      return;
    }

    await this.client.connect();

    this.isConnected = true;

    if (!this.hasConnectedAtLeastOnce) {
      this.hasConnectedAtLeastOnce = true;

      this.client.on('end', () => {
        this.isConnected = false;
      });
    }
  }

  async query<T = any>(
    query: string,
    args: any[]
  ): Promise<{ rows: T[]; rowCount: number }> {
    await this.connect();
    return this.client.query(query, args);
  }

  async clean(): Promise<void> {
    if (this.isConnected) {
      await this.client.clean();
      this.isConnected = false;
    }
  }

  async end(): Promise<void> {
    if (this.isConnected) {
      await this.client.end();
      this.isConnected = false;
    }
  }
}
