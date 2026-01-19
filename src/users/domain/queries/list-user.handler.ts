import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from '../../service/user.service';
import { ListUserQuery } from './list-user.query';

@QueryHandler(ListUserQuery)
export class ListUserHandler implements IQueryHandler<ListUserQuery> {
  constructor(private readonly service: UserService) {}

  execute(query: ListUserQuery) {
    return this.service.list(query.params);
  }
}
