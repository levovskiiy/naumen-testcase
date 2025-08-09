import { Observable } from 'rxjs';
import { UseCase } from '../../../core';
import { UserModel, UsersFilterModel } from '../../models';
import { UserRepositoryAbstract } from '../../repositories';

export class SearchUsersUseCase implements UseCase<Observable<UserModel[]>> {
  constructor(private readonly _repository: UserRepositoryAbstract) {
  }

  public execute(filters?: UsersFilterModel): Observable<UserModel[]> {
    return this._repository.search(filters);
  }
}
