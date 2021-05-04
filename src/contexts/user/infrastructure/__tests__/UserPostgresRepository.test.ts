import { Container } from 'contexts/container';
import { User } from 'contexts/user/domain/User';
import { UserId } from 'contexts/user/domain/UserId';
import { UserPassword } from 'contexts/user/domain/UserPassword';
import {
  EmailIsAlreadyInUseError,
  UserPostgresRepository,
} from 'contexts/user/infrastructure/UserPostgresRepository';

const userRepo = Container.resolve(UserPostgresRepository);
const userDetails = {
  id: new UserId('90c2d775-13cb-4507-9b40-db1a6dc3e27a'),
  name: 'test',
  email: 'test@gmail.com',
  password: UserPassword.fromHash('whatever'),
  createdAt: new Date('2021-04-29T19:03:21.346Z'),
  updatedAt: new Date('2021-04-29T19:03:21.346Z'),
};
const user = new User(userDetails);

describe('UserPostgresRepository', () => {
  beforeAll(async () => {
    await userRepo.deleteById(user.id);
  });

  describe('save', () => {
    it('saves a new user correctly', async () => {
      await expect(userRepo.findByEmail(user.email)).resolves.toBeUndefined();
      await expect(userRepo.save(user)).resolves.toEqual(1);
      await expect(userRepo.findByEmail(user.email)).resolves.toEqual(user);
      await expect(userRepo.deleteById(user.id)).resolves.toEqual(1);
    });

    it('throws an error when trying to save a user with an email that was already saved', async () => {
      const userWithSameEmail = User.create(userDetails);

      await expect(userRepo.save(user)).resolves.toEqual(1);
      await expect(userRepo.save(userWithSameEmail)).rejects.toEqual(
        new EmailIsAlreadyInUseError(userDetails.email)
      );
      await expect(userRepo.deleteById(user.id)).resolves.toEqual(1);
    });
  });

  describe('deleteById', () => {
    it("doesn't fail when trying to delete a non-existing user", async () => {
      await expect(userRepo.deleteById(user.id)).resolves.toEqual(0);
    });
  });
});
