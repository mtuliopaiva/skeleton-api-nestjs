import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../service/user.service';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly service: UserService) {}

  execute(command: DeleteUserCommand) {
    return this.service.softDelete(command.uuid);
  }
}
