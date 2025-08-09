import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormViewModel, UserModel } from '../../shared';
import { UserStatus } from '../../shared/domain/enums';

export class UserEditForm extends FormGroup<{
  name: FormControl<string>,
  email: FormControl<string>,
  status: FormControl<UserStatus>,
}> implements FormViewModel<UserModel> {
  private _model = UserModel.create({
    name: '',
    email: '',
    status: UserStatus.active,
  });

  constructor() {
    super({
      name: new FormControl('', { nonNullable: true, validators: [ Validators.max(255) ] }),
      status: new FormControl<UserStatus>(UserStatus.active, { nonNullable: true }),
      email: new FormControl('', { nonNullable: true, validators: [ Validators.email ] }),
    });
  }

  public bindModel(value: UserModel): void {
    this._model = value;

    const model = {
      name: value.name,
      status: value.status,
      email: value.email,
    };

    this.patchValue(model, { emitEvent: false });
  }

  public getModel(): UserModel {
    const raw = this.getRawValue();
    return UserModel.create({
      id: this._model.id,
      ...raw,
    });
  }
}
