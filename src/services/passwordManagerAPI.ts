import { nanoid } from "nanoid";
import { databaseExists, setData, getData } from "../database/manageDatabase";
import { ThemesType } from "../types/ThemesType";
import { UserType } from "../types/UserType";
import { UserConfigType } from "../types/UserConfigType";
import { AccountType, AccountTypeWithID } from "../types/AccountType";

async function createUserConfig(userConfig: UserConfigType) {
  Object.entries(userConfig)
    .forEach(([configKey, configValue]) => setData(configKey as keyof UserConfigType, configValue));
};

async function setTheme(theme: ThemesType) {
  setData('theme', theme);
}

async function getTheme(): Promise<ThemesType> {
  return getData('theme') ?? 'dark';
}

async function setUser(userInfos: UserType) {
  setData('user', userInfos);
}

async function getUser(): Promise<UserType> {
  return getData('user');
}

async function createAccount(accountInfos: AccountType) {
  const accountID = nanoid(8);
  const newAccount: AccountTypeWithID = { id: accountID, ...accountInfos };
  const allAccounts: AccountTypeWithID[] = await getAccounts();
  setData('accounts', [...allAccounts, newAccount]);
}

async function getAccounts(searchTerm?: string, accountID?: string): Promise<AccountTypeWithID[]> {
  const allAccounts: AccountTypeWithID[] = await getData('accounts');
  
  if (searchTerm) {
    const accountsFound = allAccounts
      .filter(({ siteName }) => new RegExp(`^${searchTerm}`).test(siteName));
    return accountsFound;
  }

  if (accountID) {
    const accountFound = allAccounts.find(({ id }) => id === accountID);
    return accountFound ? [accountFound] : [];
  }

  return allAccounts;
}

async function setAccount(accountID: string, accountInfos: AccountType) {
  const allAccounts: AccountTypeWithID[] = await getAccounts();
  const accountFoundIndex: number = allAccounts.findIndex(({ id }) => id === accountID);
  
  if (accountFoundIndex >= 0) {
    const accountModified: AccountTypeWithID = { id: allAccounts[accountFoundIndex].id, ...accountInfos };
    allAccounts.splice(accountFoundIndex, 1, accountModified);
    setData('accounts', allAccounts);
  }
}

async function deleteAccount(accountID: string) {
  const allAccounts: AccountTypeWithID[] = await getAccounts();
  const accountFoundIndex: number = allAccounts.findIndex(({ id }) => id === accountID);
  
  if (accountFoundIndex >= 0) {
    allAccounts.splice(accountFoundIndex, 1);
    setData('accounts', allAccounts);
  }
}

async function isLogged() {
  return getData('logged');
}

async function logon() {
  setData('logged', true);
}

async function logoff() {
  setData('logged', false);
}

export {
  databaseExists,
  createUserConfig,
  setTheme,
  getTheme,
  setUser,
  getUser,
  createAccount,
  getAccounts,
  setAccount,
  deleteAccount,
  isLogged,
  logon,
  logoff,
};
