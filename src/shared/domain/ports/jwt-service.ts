export interface JwtPayload {
  sub: string,
  payload: unknown,
}

export interface JwtService {
  sign(payload: JwtPayload): string,
  verify<T extends JwtPayload = JwtPayload>(token: string): T,
}