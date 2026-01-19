import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../service/user.service';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly service: UserService) {}

  execute(command: UpdateUserCommand) {
    return this.service.update(command.uuid, command.dto);
  }
}
