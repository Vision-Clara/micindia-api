export enum AUTH_ROLES {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum LOCATIONS {
  INDORE = "INDORE",
  BHOPAL = "BHOPAL",
  JABALPUR = "JABALPUR",
  HARDA = "HARDA",
  JAIPUR = "JAIPUR",
  KHANDAWA = "KHANDAWA",
  MHOW = "MHOW",
  OTHER = "OTHER",
}

export enum EMP_STATUS {
  NEW_REGISTRATION = "NEW_REGISTRATION",
  INTERVIEW_PENDING = "INTERVIEW_PENDING",
  CONFIRMED_VOLUNTEER = "CONFIRMED_VOLUNTEER",
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
