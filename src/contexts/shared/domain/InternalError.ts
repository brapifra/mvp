export enum InternalErrorType {
  INVALID_EMAIL = 'INVALID_EMAIL',
}

export class InternalError extends Error {
  constructor(public type: InternalErrorType, public message: string) {
    super(message);
  }
}
