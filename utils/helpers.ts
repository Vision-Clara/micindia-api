export enum AUTH_ROLES {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const COOKIE_OPTIONS = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export class CustomError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
