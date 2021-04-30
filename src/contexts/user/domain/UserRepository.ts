import { User } from 'contexts/user/domain/User';
import { UserId } from 'contexts/user/domain/UserId';
import { UserEmail } from 'contexts/user/domain/UserEmail';

export interface UserRepository {
  save(user: User): Promise<number>;
  findByEmail(email: UserEmail): Promise<User | void>;
  deleteById(id: UserId): Promise<number>;
}
