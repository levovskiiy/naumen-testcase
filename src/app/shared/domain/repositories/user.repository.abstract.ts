import { Observable } from 'rxjs';
import { UserModel, UsersFilterModel } from '../models';

export abstract class UserRepositoryAbstract {
  /**
   * Создать новую модель пользователя
   */
  public abstract create(model: UserModel): Observable<UserModel>;

  /**
   * Обновить существующую модель пользователя
   */
  public abstract update(model: UserModel): Observable<UserModel>;

  /**
   * Получить список пользователей согласно фильтрам
   */
  public abstract search(filters?: UsersFilterModel): Observable<UserModel[]>;
}
