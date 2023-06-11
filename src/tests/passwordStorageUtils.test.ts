import { savePassword, getPasswordsList } from '../utils/passwordStorageUtils';
import { PasswordInfosWithID } from '../types';

describe('Testando correto funcionamento das funções de acesso e manipulação do localStorage', () => {
  const passwordInfo1 = {
    id: '1',
    title: 'YouTube',
    url: 'https://www.youtube.com',
    login: 'exemple1@gmail.com',
    password: 'ytbpasswd123',
  };

  const passwordInfo2 = {
    id: '2',
    title: 'Crunchyroll',
    url: 'https://www.crunchyroll.com',
    login: 'exemple2@gmail.com',
    password: 'chrpasswd123',
  };

  const passwordsInfoList = [passwordInfo1, passwordInfo2];

  beforeEach(() => {
    localStorage.clear();
  });

  test('1 - Ao chamar a função getPasswordList sem nenhuma senha cadastrada, ele retorna um array vazio', () => {
    const expected: PasswordInfosWithID[] = [];
    const result = getPasswordsList();
    
    expect(result).toEqual(expected);
  });

  test('2 - Ao passar as informações da senha, a função savePassword salva-as no localStorage', () => {
    savePassword(passwordInfo1);
    
    const expected = [passwordInfo1];
    const result = JSON.parse(localStorage.getItem('passwords-saved-list') as string);
    
    expect(result).toEqual(expected);
  });

  test('3 - Ao salvar senhas no localStorage, a função getPasswordList retorna um array com todos os objetos de senhas salvas', () => {
    savePassword(passwordInfo1);
    savePassword(passwordInfo2);

    const expected = passwordsInfoList;
    const result = getPasswordsList();

    expect(result).toEqual(expected);
  });
});