export type SiteAccountType = {
  siteName: string,
  siteUrl: string,
  accountLogin: string,
  accountPassword: string,
};

export type SiteAccountTypeWithID = SiteAccountType & { id: string };
