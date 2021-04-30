export class UserName {
  constructor(private name: string) {
    if (name.length > 30) {
      throw new LongUserNameError(name);
    }
  }

  toDto(): string {
    return this.name;
  }
}

export class LongUserNameError extends Error {
  constructor(name: string) {
    super(`User name '${name}' is too long`);
  }
}
