// TODO: Replace "crypto" module with browser-compatible lib
import { createHash } from 'crypto'

export class UserPassword {
  private constructor(private passwordHash: string) {}

  static fromPlainText(plainPassword: string): UserPassword {
    return new UserPassword(
      createHash('sha256').update(plainPassword).digest('hex')
    )
  }

  static fromHash(hashedPassword: string): UserPassword {
    return new UserPassword(hashedPassword)
  }

  toString(): string {
    return this.passwordHash
  }
}
