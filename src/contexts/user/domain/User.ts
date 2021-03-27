import { Entity } from 'contexts/shared/domain/Entity'
import { UserPassword } from 'contexts/user/domain/UserPassword'
import { UserId } from 'contexts/user/domain/UserId'

export class User implements Entity<UserId> {
  public readonly id: UserId
  public readonly name: string
  public readonly email: string
  public readonly password: UserPassword
  public readonly createdAt: Date
  public readonly updatedAt: Date

  constructor(details: AllUserDetails) {
    this.id = details.id
    this.createdAt = details.createdAt
    this.updatedAt = details.updatedAt
    this.name = details.name
    this.email = details.email
    this.password = details.password
  }

  static create(details: UserRequiredDetails): User {
    const now = new Date()

    return new User({
      ...details,
      id: new UserId(),
      createdAt: now,
      updatedAt: now,
    })
  }

  toDto(): UserDTO {
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email,
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    }
  }
}

type UserDTO = Omit<
  User,
  'id' | 'createdAt' | 'updatedAt' | 'toDto' | 'password'
> & {
  id: string
  createdAt: string
  updatedAt: string
}

type UserRequiredDetails = {
  name: string
  email: string
  password: UserPassword
}

type AllUserDetails = UserRequiredDetails & {
  id: UserId
  createdAt: Date
  updatedAt: Date
}
