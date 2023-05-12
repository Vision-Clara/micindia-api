export enum AUTH_ROLES {
  NEW_USER = "NEW_USER",
  REG_USER = "REG_USER",
  ADMIN = "ADMIN",
}

export const COOKIE_OPTIONS = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};
