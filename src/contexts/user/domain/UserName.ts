export class UserName {
  constructor(private name: string) {
    const trimmedName = name.trim();

    switch (true) {
      case trimmedName.length === 0:
        throw new EmptyUserNameError();
      case trimmedName.length > 30:
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

export class EmptyUserNameError extends Error {
  constructor() {
    super("User name can't be empty");
  }
}
