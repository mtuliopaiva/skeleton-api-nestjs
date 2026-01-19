import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../../service/auth.service';
import { AuthLoginCommand } from './login.command';

@CommandHandler(AuthLoginCommand)
export class AuthLoginHandler implements ICommandHandler<AuthLoginCommand> {
  constructor(private readonly authService: AuthService) {}

  execute(command: AuthLoginCommand) {
    return this.authService.login(command.email, command.password);
  }
}
