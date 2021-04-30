import { UserCreator } from 'contexts/user/application/UserCreator';
import { User } from 'contexts/user/domain/User';
import { UserPassword } from 'contexts/user/domain/UserPassword';

const fakeUserRepository = {
  save: jest.fn(),
  findByEmail: jest.fn(),
  deleteById: jest.fn(),
};
const fakeUserId = 'fake-user-id';

const userCreator = new UserCreator(fakeUserRepository);

const fakeDate = new Date(1466424490000);
const newUserData = {
  name: 'test',
  email: 'this@email.com',
  password: 'secret',
};
const expectedNewUser = {
  id: fakeUserId,
  name: 'test',
  email: 'this@email.com',
  createdAt: fakeDate.toString(),
  updatedAt: fakeDate.toString(),
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
jest.spyOn(global, 'Date').mockImplementation(() => fakeDate);

jest.mock('contexts/user/domain/UserId', () => ({
  UserId: class {
    toString() {
      return fakeUserId;
    }
  },
}));

describe('UserCreator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('saves the new user', async () => {
    await expect(userCreator.run(newUserData)).resolves.toEqual(
      expectedNewUser
    );

    expect(fakeUserRepository.save).toBeCalledTimes(1);
    expect(fakeUserRepository.save).toBeCalledWith(
      User.create({
        ...newUserData,
        password: UserPassword.fromPlainText(newUserData.password),
      })
    );
  });
  it('throws an error if the repository is not available', async () => {
    const error = new Error('Not available');

    fakeUserRepository.save.mockReturnValueOnce(Promise.reject(error));

    await expect(userCreator.run(newUserData)).rejects.toEqual(error);

    expect(fakeUserRepository.save).toBeCalledTimes(1);
    expect(fakeUserRepository.save).toBeCalledWith(
      User.create({
        ...newUserData,
        password: UserPassword.fromPlainText(newUserData.password),
      })
    );
  });
});
