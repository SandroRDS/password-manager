import { vi, Mock } from 'vitest';
import StorageAdapter from '../../src/adapters/storage/StorageAdapter';

describe('1 - Testando correto comportamento da classe StorageAdapter', () => {
  const storageAdapter = new StorageAdapter();
  const storageDataMock = { 
    theme: 'dark',
    user: {
      username: 'Jhon',
      profileImage: 'profileImage1.jpg',
      pin: '231344235',
    },
    siteAccountsList: [
      {
        siteName: 'YouTube',
        siteUrl: 'https://www.youtube.com',
        accountLogin: 'jhon@gmail.com',
        accountPassword: 'password121',
      }
    ],
  };

  window.localStorage = {
    ...window.localStorage,
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  }

  beforeEach(() => vi.resetAllMocks());
  
  test('1.1 - Método saveItem faz uma chamada corretamente ao setItem do localStorage.', () => {
    const verifyStorageCalls = <ItemStorage>(key: string, value: ItemStorage) => {
      storageAdapter.saveItem<ItemStorage>(key, value);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
      (localStorage.setItem as Mock).mockClear();
    }

    Object.entries(storageDataMock).forEach(([key, value]) => {
      verifyStorageCalls<typeof value>(key, value);
    })
  });

  test('1.2 - Método saveItem retorna um erro personalizado caso o localStorage lance um erro de QuotaExceeded.', () => {
    (localStorage.setItem as Mock).mockImplementation(() => {
      const quotaError = new Error();
      quotaError.name = 'QuotaExceededError';
      throw quotaError;
    });

    expect(() => storageAdapter.saveItem<string>('theme', storageDataMock.theme)).toThrow('Cota de armazenamento do navegador excedida.');
  });

  test('1.3 - Método saveItem retorna um erro caso a chave recebida não esteja configurada em STORAGE_KEYS.', () => {
    expect(() => storageAdapter.saveItem<string>('item1', 'foo')).toThrow('Chave não configurada.');
    expect(() => storageAdapter.saveItem<string>('theme', storageDataMock.theme)).not.toThrow('Chave não configurada.');
  });

  test('1.4 - Método saveItem re-lança o erro recebido caso o localStorage envie algum outro tipo de erro.', () => {
    (localStorage.setItem as Mock).mockImplementation(() => {
      const randomError = new Error('Random Error');
      throw randomError;
    });

    expect(() => storageAdapter.saveItem('theme', storageDataMock.theme)).toThrow('Random Error');
    expect(() => storageAdapter.saveItem('theme', storageDataMock.theme)).not.toThrow('Cota de armazenamento do navegador excedida.');
  });
  
  test('1.5 - Método getItem faz uma chamada corretamente ao getItem do localStorage e retorna o dado extraído desconvertido do formato JSON.', () => {
    const verifyStorageCalls = <ItemStorage>(key: string, valueExpected: ItemStorage) => {
      const result = storageAdapter.getItem<ItemStorage>(key);
      expect(localStorage.getItem).toBeCalledTimes(1);
      expect(localStorage.getItem).toBeCalledWith(key);

      if (typeof valueExpected === 'object') expect(result).toEqual(valueExpected);
      else expect(result).toBe(valueExpected);
      
      (localStorage.getItem as Mock).mockClear();
    }

    (localStorage.getItem as Mock).mockImplementation((key) => JSON.stringify(storageDataMock[key]));

    Object.entries(storageDataMock).forEach(([key, value]) => {
      verifyStorageCalls<typeof value>(key, value);
    })
  });

  test('1.6 - Método getItem retorna null caso o localStorage retorne null (não reconheça que a chave está declarada).', () => {
    expect(storageAdapter.getItem<string>('theme')).toBeNull();
  });

  test('1.7 - Método getItem retorna um erro caso a chave recebida não esteja configurada em STORAGE_KEYS.', () => {
    expect(() => storageAdapter.getItem('item1')).toThrow('Chave não configurada.');
  });

  test('1.8 - Método deleteItem faz uma chamada corretamente ao removeItem do localStorage.', () => {
    storageAdapter.deleteItem('item1');
    expect(localStorage.removeItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledWith('item1');
  });
});