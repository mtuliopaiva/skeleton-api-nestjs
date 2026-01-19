import { AuthRegisterDto } from '../dtos/register-auth.dto';

export class RegisterCommand {
  constructor(public readonly dto: AuthRegisterDto) {}
}
