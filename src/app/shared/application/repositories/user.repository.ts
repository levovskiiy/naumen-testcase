import { map, Observable, of, switchMap, throwError, timer } from 'rxjs';
import { UserRepositoryAbstract, UserModel, UsersFilterModel } from '../../domain';
import { UserStatus } from '../../domain/enums';

let USER_ID_INC = 1;
const users: UserModel[] = [
  UserModel.create({
    id: USER_ID_INC++,
    name: 'Tester',
    email: 'tester@com.ru',
    status: UserStatus.active,
  }),
  UserModel.create({
    id: USER_ID_INC++,
    name: 'Developer',
    email: 'developer@dev.com',
    status: UserStatus.inactive,
  }),
];

export class UserRepository extends UserRepositoryAbstract {
  public override create(model: UserModel): Observable<UserModel> {
    const entity: UserEntity = {
      id: USER_ID_INC++,
      name: model.name,
      email: model.email,
      status: model.status,
    };

    const created = UserModel.create(entity);
    users.push(created);

    return this.request().pipe(map(() => created));
  }

  public override update(model: UserModel): Observable<UserModel | never> {
    if (model.id === null) {
      return throwError(
        () => new Error('Cannot update user: ID must not be null'),
      );
    }

    const found = users.findIndex((user) => user.id === model.id);
    if (found < 0) {
      return throwError(
        () => new Error('Cannot update user: Not found user by ID: ' + model.id),
      );
    }

    users[found] = UserModel.create({
      id: model.id,
      name: model.name,
      email: model.email,
      status: model.status,
    });

    return this.request().pipe(
      map(() => users[found]),
    );
  }

  public override search(filters?: UsersFilterModel): Observable<UserModel[]> {
    const { name = '', status = null } = filters ?? {};
    console.log(status);
    const _users = users
      .filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
      .filter((item) => status === null ? true : status === item.status);

    return this.request().pipe(switchMap(() => of(_users)));
  }

  private request(): Observable<number> {
    return timer(1000);
  }
}

type UserEntity = {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
};
