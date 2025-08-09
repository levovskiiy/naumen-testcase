import { Observable } from 'rxjs';
import { UseCase } from '../../../core';
import { UserModel } from '../../models';
import { UserRepositoryAbstract } from '../../repositories';

export class UpdateUserUseCase implements UseCase<Observable<UserModel>> {
  constructor(private readonly _repositroy: UserRepositoryAbstract) {
  }

  public execute(model: UserModel): Observable<UserModel> {
    return this._repositroy.update(model);
  }
}
