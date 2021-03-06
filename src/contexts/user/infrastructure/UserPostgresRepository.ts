import { DatabaseClient } from 'contexts/shared/domain/DatabaseClient';
import { inject, singleton } from 'tsyringe';
import { User } from '../domain/User';
import { UserEmail } from 'contexts/user/domain/UserEmail';
import { UserId } from '../domain/UserId';
import { UserPassword } from '../domain/UserPassword';
import { UserRepository } from '../domain/UserRepository';

@singleton()
export class UserPostgresRepository implements UserRepository {
  constructor(@inject('DatabaseClient') private client: DatabaseClient) {}

  async save(user: User): Promise<number> {
    try {
      const {
        rowCount,
      } = await this.client.query(
        'INSERT INTO users(id, name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [
          user.id.toString(),
          user.name.toDto(),
          user.email.toDto(),
          user.password.toString(),
          user.createdAt,
          user.updatedAt,
        ]
      );

      return rowCount;
    } catch (e) {
      switch (true) {
        case e.code === '23505' && e.constraint === 'users_email_key':
          throw new EmailIsAlreadyInUseError(user.email.toDto());
        default:
          throw e;
      }
    }
  }

  async findByEmail(email: UserEmail): Promise<void | User> {
    const {
      rows,
    } = await this.client.query('SELECT * FROM users WHERE email = $1', [
      email.toDto(),
    ]);

    const row = rows[0];

    return row
      ? new User({
          id: new UserId(row.id),
          name: row.name,
          email: row.email,
          password: UserPassword.fromHash(row.password),
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        })
      : undefined;
  }

  async deleteById(id: UserId): Promise<number> {
    const {
      rowCount,
    } = await this.client.query('DELETE FROM users WHERE id = $1', [
      id.toString(),
    ]);

    return rowCount;
  }
}

export class EmailIsAlreadyInUseError extends Error {
  constructor(email: string) {
    super(`Email '${email}' is already in use`);
  }
}
