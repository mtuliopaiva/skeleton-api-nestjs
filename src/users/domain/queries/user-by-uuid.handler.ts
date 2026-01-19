import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../../service/user.service';
import { UserByUuidQuery } from './user-by-uuid.query';

@QueryHandler(UserByUuidQuery)
export class UserByUuidHandler implements IQueryHandler<UserByUuidQuery> {
  constructor(private readonly service: UserService) {}

  execute(query: UserByUuidQuery) {
    return this.service.findByUuid(query.uuid);
  }
}
