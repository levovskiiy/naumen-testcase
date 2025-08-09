import { UserStatus } from '../enums';

export class UserModel {

  constructor(
    public id: number | null,
    public name: string,
    public email: string,
    public status: UserStatus,
  ) {
  }

  public static create(options?: Partial<UserData>) {
    return new UserModel(options?.id ?? null, options?.name ?? '', options?.email ?? '', options?.status ?? UserStatus.active);
  }
}

interface UserData {
  id: number | null;
  name: string;
  email: string;
  status: UserStatus;
}

