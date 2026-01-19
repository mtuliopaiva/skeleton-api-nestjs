export interface JwtPayload {
  sub: string;
  email: string;
  type: string;
  iat?: number;
  exp?: number;
  iss?: string;
  aud?: string | string[];
}
