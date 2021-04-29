export interface DatabaseClient {
  connect(): Promise<void>;
  query<T = any>(query: string, args?: any[]): Promise<{ rows: T[] }>;
  clean(): Promise<void>;
  end(): Promise<void>;
}
