import { Observable } from 'rxjs';
import { UseCase } from '../../../core';
import { UserModel } from '../../models';
import { UserRepositoryAbstract } from '../../repositories';

export class CreateUserUseCase implements UseCase<Observable<UserModel>> {
  constructor(private readonly _repository: UserRepositoryAbstract) {
  }

  public execute(model: UserModel): Observable<UserModel> {
    return this._repository.create(model);
  }
}
