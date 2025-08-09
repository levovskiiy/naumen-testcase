import { UserStatus } from '../enums';

export class UsersFilterModel {
  constructor(
    public name: string,
    public status: UserStatus | null,
  ) {
  }
}
