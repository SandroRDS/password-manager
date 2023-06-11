import { PasswordInfosWithID } from "../types";

export function savePassword(passwordInfos: PasswordInfosWithID) {
  const passwordsSaved = getPasswordsList();
  const jsonPasswordInfos = JSON.stringify([...passwordsSaved, passwordInfos]);
  localStorage.setItem('passwords-saved-list',jsonPasswordInfos);
}

export function getPasswordsList(): PasswordInfosWithID[] {
  const passwordsSaved = localStorage.getItem('passwords-saved-list');
  if (!passwordsSaved) localStorage.setItem('passwords-saved-list', '[]');
  return JSON.parse(passwordsSaved ?? '[]');
}