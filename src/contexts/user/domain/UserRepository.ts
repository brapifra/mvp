import { User } from 'contexts/user/domain/User';
import { UserId } from 'contexts/user/domain/UserId';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | void>;
  findByEmail(email: string): Promise<User | void>;
  deleteById(id: UserId): Promise<void>;
}
