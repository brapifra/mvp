import { PostgresServerlessClient } from '../PostgresServerlessClient';

const pgMock = {
  connect: jest.fn(() => Promise.resolve()),
  clean: jest.fn(() => Promise.resolve()),
  query: jest.fn(() => Promise.resolve({ rows: [] })),
};

jest.mock(
  'serverless-postgres',
  () =>
    class {
      connect = pgMock.connect;
      clean = pgMock.clean;
      query = pgMock.query;
    }
);

const defaultConfig = { port: 1234 };

const defaultClient = new PostgresServerlessClient(defaultConfig);

describe('PostgresServerlessClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('connect', () => {
    it('calls pg.connect', async () => {
      expect(pgMock.connect).not.toBeCalled();
      await defaultClient.connect();
      expect(pgMock.connect).toBeCalledTimes(1);
      expect(pgMock.clean).not.toBeCalled();
      expect(pgMock.query).not.toBeCalled();
    });
  });

  describe('query', () => {
    it('calls pg.query', async () => {
      const query = 'SOME QUERY';
      const args = [1, 'hello'];

      expect(pgMock.query).not.toBeCalled();
      await defaultClient.query(query, args);
      expect(pgMock.query).toBeCalledTimes(1);
      expect(pgMock.query).toBeCalledWith(query, args);
      expect(pgMock.connect).not.toBeCalled();
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
