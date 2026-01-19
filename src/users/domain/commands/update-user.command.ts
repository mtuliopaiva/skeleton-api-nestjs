import { UpdateUserDto } from '../dtos/update-user.dto';

export class UpdateUserCommand {
  constructor(
    public readonly uuid: string,
    public readonly dto: UpdateUserDto,
  ) {}
}
