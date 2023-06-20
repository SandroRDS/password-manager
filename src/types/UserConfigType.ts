import { ThemesType } from "./ThemesType";
import { UserType } from "./UserType";
import { AccountTypeWithID } from "./AccountType";

export type UserConfigType = {
  theme: ThemesType,
  user: UserType,
  accounts: AccountTypeWithID[],
  logged: boolean
};
