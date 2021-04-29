jest.resetModules();
import { PostgresServerlessClient } from '../PostgresServerlessClient';

const pgMock = {
  connect: jest.fn(() => Promise.resolve()),
  clean: jest.fn(() => Promise.resolve()),
  query: jest.fn(() => Promise.resolve({ rows: [] })),
  on: jest.fn(),
};

jest.mock(
  'serverless-postgres',
  () =>
    class {
      connect = pgMock.connect;
      clean = pgMock.clean;
      query = pgMock.query;
      on = pgMock.on;
    }
);

const defaultConfig = {
  port: 1234,
  host: 'host',
  password: 'pass',
  debug: false,
  database: 'name',
  user: 'user',
};

describe('PostgresServerlessClient', () => {
  let defaultClient;
  beforeEach(() => {
    defaultClient = new PostgresServerlessClient(defaultConfig);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('connect', () => {
    it('calls pg.connect', async () => {
      expect(pgMock.connect).not.toBeCalled();
      await defaultClient.connect();
      expect(pgMock.connect).toBeCalledTimes(1);
      expect(pgMock.on).toBeCalledTimes(1);
      expect(pgMock.on).toBeCalledWith('end', expect.anything());
      expect(pgMock.clean).not.toBeCalled();
      expect(pgMock.query).not.toBeCalled();
    });
    it("doesn't call pg.connect if client is already connected to DB", async () => {
      expect(pgMock.connect).not.toBeCalled();
      await defaultClient.connect();
      await defaultClient.connect();
      await defaultClient.connect();
      expect(pgMock.connect).toBeCalledTimes(1);
      expect(pgMock.clean).not.toBeCalled();
      expect(pgMock.query).not.toBeCalled();

      await defaultClient.disconnect();
      await defaultClient.connect();
      await defaultClient.connect();
      expect(pgMock.clean).toBeCalledTimes(1);
      expect(pgMock.on).toBeCalledTimes(1);
      expect(pgMock.connect).toBeCalledTimes(2);
      expect(pgMock.query).not.toBeCalled();
    });
  });

  describe('query', () => {
    it('calls pg.query', async () => {
      const query = 'SOME QUERY';
      const args = [1, 'hello'];

      expect(pgMock.query).not.toBeCalled();
      await defaultClient.query(query, args);
      expect(pgMock.connect).toBeCalledTimes(1);
      expect(pgMock.query).toBeCalledTimes(1);
      expect(pgMock.query).toBeCalledWith(query, args);
      expect(pgMock.clean).not.toBeCalled();
    });
  });

  describe('disconnect', () => {
    it('calls pg.disconnect', async () => {
      expect(pgMock.clean).not.toBeCalled();
      await defaultClient.disconnect();
      expect(pgMock.clean).toBeCalledTimes(1);
      expect(pgMock.connect).not.toBeCalled();
      expect(pgMock.query).not.toBeCalled();
    });
  });
});
