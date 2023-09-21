export interface UserToken {
  Id: string;
  Role: string;
  sub: string;
  email: string;
  jti: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
}
