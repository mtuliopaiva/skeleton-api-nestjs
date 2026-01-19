export class AuthLoginCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
