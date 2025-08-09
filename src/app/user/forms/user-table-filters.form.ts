import { FormControl, FormGroup } from '@angular/forms';
import { FormViewModel, UsersFilterModel } from '../../shared';
import { UserStatus } from '../../shared/domain/enums';

export class UserTableFiltersForm extends FormGroup<UserTableFiltersControls> implements FormViewModel<UsersFilterModel> {
  constructor() {
    super({
      name: new FormControl('', { nonNullable: true }),
      status: new FormControl<UserStatus | null>(null),
    });
  }

  public bindModel(value: UsersFilterModel): void {
    this.patchValue({
      name: value.name,
      status: value.status,
    }, { emitEvent: false });
  }

  public getModel(): UsersFilterModel {
    const raw = this.getRawValue();
    return new UsersFilterModel(raw.name, raw.status);
  }
}

interface UserTableFiltersControls {
  name: FormControl<string>;
  status: FormControl<UserStatus | null>;
}
