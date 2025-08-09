import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/ui/input/input.component';
import { SelectComponent } from '../../shared/ui/select/select.component';
import { USERS_STATUS_SELECT_ITEMS } from '../constants/statuses';
import { UserTableFiltersForm } from '../forms/user-table-filters.form';

@Component({
  selector: 'app-user-list-filters',
  imports: [
    InputComponent,
    SelectComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-table-filters.component.html',
  styleUrl: './user-table-filters.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableFiltersComponent {
  public form = input.required<UserTableFiltersForm>();

  public readonly statusSelectOptions = [
    { label: 'Все', value: null },
    ...USERS_STATUS_SELECT_ITEMS,
  ];
}
