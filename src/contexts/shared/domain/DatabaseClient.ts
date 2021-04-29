export interface DatabaseClient {
  connect(): Promise<void>;
  query<T = any>(
    query: string,
    args?: any[]
  ): Promise<{ rows: T[]; rowCount: number }>;
  clean(): Promise<void>;
  end(): Promise<void>;
}
