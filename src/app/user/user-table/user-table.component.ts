import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, Signal, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, finalize, Observable, tap } from 'rxjs';
import {
  UserModel,
  UserModule,
  ButtonComponent,
  InputComponent,
  SelectComponent,
  SkeletonComponent,
} from '../../shared';
import { RepeatDirective } from '../../shared/directives/repeat';
import { USER_STATUS_TITLE_MAP, USERS_STATUS_SELECT_ITEMS } from '../constants/statuses';
import { UserEditForm } from '../forms/user-edit.form';
import { UserTableFiltersForm } from '../forms/user-table-filters.form';
import { UserDataService } from '../services';
import { UserTableFiltersComponent } from '../user-table-filters/user-table-filters.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UserModule,
    UserTableFiltersComponent,
    RepeatDirective,
    SkeletonComponent,
    ButtonComponent,
    InputComponent,
    NgTemplateOutlet,
    ReactiveFormsModule,
    SelectComponent,
  ],
  providers: [ UserDataService ],
})
export class UserTableComponent {

  public readonly users: Signal<UserModel[]>;
  public readonly loading: Signal<boolean>;
  public readonly filterForms = new UserTableFiltersForm();
  public readonly editUserForm = new UserEditForm();
  public readonly hasFiltersValue = signal<boolean>(false);
  public readonly editDataIndex = signal(-1);
  public readonly isCreating = signal(false);
  public readonly sending = signal(false);
  public readonly canCreateUser = computed(() => this.editDataIndex() === -1);

  public readonly statusTitleMapping = USER_STATUS_TITLE_MAP;
  public readonly statusSelectItems = USERS_STATUS_SELECT_ITEMS;

  private readonly _userDataService = inject(UserDataService);

  constructor() {
    this.users = toSignal(this._userDataService.users$, { initialValue: [] });
    this.loading = toSignal(this._userDataService.loading$, { initialValue: false });
    this._userDataService.load();
    this.watchToFilters();
  }

  public addUser(): void {
    this.isCreating.set(true);
    const model = UserModel.create();
    this.editUserForm.bindModel(model);
    this._userDataService.addTempModel(model);
    this.editDataIndex.set(this.users().length - 1);
  }

  public saveUser(model: UserModel): Observable<UserModel> {
    const firstCreate = model.id == null;
    return firstCreate ? this._userDataService.create(model) : this._userDataService.update(model);
  }

  public editData(rowIndex: number) {
    const data = this.users()[rowIndex];
    this.editUserForm.bindModel(data);
    this.editDataIndex.set(rowIndex);
  }

  private watchToFilters(): void {
    this.filterForms.valueChanges
      .pipe(
        debounceTime(300),
        takeUntilDestroyed(),
        tap((changes) => {
          this.hasFiltersValue.set((changes.name?.length || 0) > 0);
          this._userDataService.load(this.filterForms.getModel());
        }),
      )
      .subscribe();
  }

  public cancelEdit(rowIndex: number): void {
    const model = this.users()[rowIndex];
    if (model.id == null) {
      this._userDataService.removeLastModel();
    }

    this.editDataIndex.set(-1);
    this.editUserForm.reset();
    this.isCreating.set(false);
  }

  public acceptEdit(rowIndex: number): void {
    this.sending.set(true);
    const model = this.editUserForm.getModel();
    this.saveUser(model)
      .pipe(
        tap(() => {
          this.cancelEdit(rowIndex);
          this._userDataService.load();
        }),
        finalize(() => {
          this.sending.set(false);
        }),
      )
      .subscribe();
  }
}
