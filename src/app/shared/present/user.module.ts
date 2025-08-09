import { NgModule } from '@angular/core';
import {
  CreateUserUseCase,
  SearchUsersUseCase,
  UpdateUserUseCase,
  UserRepositoryAbstract,
} from '../domain';
import { UserRepository } from '../application';

@NgModule({
  providers: [
    {
      provide: UserRepositoryAbstract,
      useFactory: () => {
        return new UserRepository();
      },
    },
    {
      provide: CreateUserUseCase,
      useFactory: (repo: UserRepositoryAbstract) => {
        return new CreateUserUseCase(repo);
      },
      deps: [ UserRepositoryAbstract ],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (repo: UserRepositoryAbstract) => {
        return new UpdateUserUseCase(repo);
      },
      deps: [ UserRepositoryAbstract ],
    },
    {
      provide: SearchUsersUseCase,
      useFactory: (repo: UserRepositoryAbstract) => {
        return new SearchUsersUseCase(repo);
      },
      deps: [ UserRepositoryAbstract ],
    },
  ],
})
export class UserModule {
}
