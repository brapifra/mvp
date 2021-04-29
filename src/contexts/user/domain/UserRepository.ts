import { User } from 'contexts/user/domain/User';
import { UserId } from 'contexts/user/domain/UserId';

export interface UserRepository {
  save(user: User): Promise<number>;
  findByEmail(email: string): Promise<User | void>;
  deleteById(id: UserId): Promise<number>;
}
