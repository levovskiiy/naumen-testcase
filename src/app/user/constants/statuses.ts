import { UserStatus } from '../../shared/domain/enums';

export const USER_STATUS_TITLE_MAP = {
  [UserStatus.active]: 'Активный',
  [UserStatus.inactive]: 'Неактивный',
};

export const USERS_STATUS_SELECT_ITEMS = [
  { label: USER_STATUS_TITLE_MAP[UserStatus.active], value: UserStatus.active },
  { label: USER_STATUS_TITLE_MAP[UserStatus.inactive], value: UserStatus.inactive },
];
