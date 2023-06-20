export type AccountType = {
  siteName: string,
  siteUrl: string,
  accountLogin: string,
  accountPassword: string,
};

export type AccountTypeWithID = AccountType & { id: string };
