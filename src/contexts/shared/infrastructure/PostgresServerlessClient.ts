import { DatabaseClient } from '../domain/DatabaseClient';
import ServerlessClient from 'serverless-postgres';

interface Config {
  port: number;
}

export class PostgresServerlessClient implements DatabaseClient {
  private client: ServerlessClient;

  constructor(config: Config) {
    this.client = new ServerlessClient(config);
  }

  connect(): Promise<void> {
    return this.client.connect();
  }

  query<T = any>(query: string, args: any[]): Promise<{ rows: T[] }> {
    return this.client.query(query, args);
  }

  async disconnect(): Promise<void> {
    await this.client.clean();
  }
}
