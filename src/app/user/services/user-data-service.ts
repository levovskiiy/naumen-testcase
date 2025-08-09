import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import {
  CreateUserUseCase,
  NotificationService,
  SearchUsersUseCase,
  UpdateUserUseCase,
  UserModel,
  UsersFilterModel,
} from '../../shared';

@Injectable()
export class UserDataService {
  private readonly _users$ = new BehaviorSubject<UserModel[]>([]);
  private readonly _loading$ = new BehaviorSubject<boolean>(false);

  private readonly _createUseCase = inject(CreateUserUseCase);
  private readonly _updateUseCase = inject(UpdateUserUseCase);
  private readonly _searchUseCase = inject(SearchUsersUseCase);
  private readonly _notificationService = inject(NotificationService);
  private readonly _destroyRef = inject(DestroyRef);

  public readonly users$ = this._users$.asObservable();
  public readonly loading$ = this._loading$.asObservable();

  public load(filters?: UsersFilterModel): void {
    this._loading$.next(true);
    this._searchUseCase.execute(filters)
      .pipe(
        finalize(() => {
          this._loading$.next(false);
        }),
        tap((data) => {
          this._users$.next(data);
        }),
        catchError((err) => {
          this._notificationService.error(err.message);
          return EMPTY;
        }),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  public create(model: UserModel): Observable<UserModel> {
    return this._createUseCase.execute(model)
      .pipe(
        tap((saved) => {
          this._notificationService.success(`Пользователь ${saved.name} создан`);
        }),
        catchError((err) => {
          this._notificationService.error(err.message);
          return EMPTY;
        }),
        takeUntilDestroyed(this._destroyRef),
      );
  }

  public update(model: UserModel): Observable<UserModel> {
    return this._updateUseCase.execute(model)
      .pipe(
        tap((updated) => {
          this._notificationService.success(`Пользователь ${updated.name} отредактирован`);
        }),
        catchError((err) => {
          this._notificationService.error(err.message);
          return EMPTY;
        }),
        takeUntilDestroyed(this._destroyRef),
      );
  }

  public addTempModel(value: UserModel): void {
    this._users$.next([ ...this._users$.value, value ]);
  }

  public removeLastModel(): void {
    const arr = this._users$.value.slice();
    arr.pop();

    this._users$.next(arr);
  }
}
