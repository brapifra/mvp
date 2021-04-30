import { singleton } from 'tsyringe';
import { UserRepository } from 'contexts/user/domain/UserRepository';
import { User, UserDTO } from 'contexts/user/domain/User';
import { UserPassword } from 'contexts/user/domain/UserPassword';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

@singleton()
export class UserCreator {
  constructor(private userRepo: UserRepository) {}

  async run(newUserData: CreateUserDTO): Promise<UserDTO> {
    const newUser = User.create({
      ...newUserData,
      password: UserPassword.fromPlainText(newUserData.password),
    });

    await this.userRepo.save(newUser);

    return newUser.toDto();
  }
}
