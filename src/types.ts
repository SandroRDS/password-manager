export type PasswordInfos = {
  title: string,
  url: string,
  login: string,
  password: string,
};

export type PasswordInfosWithID = PasswordInfos & { id: string };