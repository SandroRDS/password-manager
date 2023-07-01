import { vi, Mock } from 'vitest';
import StorageAdapter from '../../src/adapters/storage/StorageAdapter';

describe('1 - Testando correto comportamento da classe StorageAdapter', () => {
  const storageAdapter = new StorageAdapter();

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

    verifyStorageCalls<number>('item1', 42);
    verifyStorageCalls<string>('item2', 'random value');
    verifyStorageCalls<boolean>('item3', true);
    verifyStorageCalls<number[]>('item4', [1, 2, 3]);
    verifyStorageCalls<{ name: string, age: number }>('item5', { 
      name: 'Jhon', age: 23 
    });
  });

  test('1.2 - Método saveItem retorna um erro personalizado caso o localStorage lance um erro de QuotaExceeded.', () => {
    (localStorage.setItem as Mock).mockImplementation(() => {
      const quotaError = new Error();
      quotaError.name = 'QuotaExceededError';
      throw quotaError;
    });

    expect(() => storageAdapter.saveItem<string>('item1', 'foo')).toThrow('Cota de armazenamento do navegador excedida.');
    expect(() => storageAdapter.saveItem<string>('item1', 'foo')).not.toThrow('Erro');
  });

  test('1.3 - Método saveItem re-lança o erro recebido caso o localStorage envie algum outro tipo de erro.', () => {
    (localStorage.setItem as Mock).mockImplementation(() => {
      const randomError = new Error('Random Error');
      throw randomError;
    });

    expect(() => storageAdapter.saveItem('item1', 'foo')).toThrow('Random Error');
    expect(() => storageAdapter.saveItem('item1', 'foo')).not.toThrow('Cota de armazenamento do navegador excedida.');
  });
  
  test('1.4 - Método getItem faz uma chamada corretamente ao getItem do localStorage e retorna o dado extraído desconvertido do formato JSON.', () => {
    const verifyStorageCalls = <ItemStorage>(key: string, valueExpected: ItemStorage) => {
      const result = storageAdapter.getItem<ItemStorage>(key);
      expect(localStorage.getItem).toBeCalledTimes(1);
      expect(localStorage.getItem).toBeCalledWith(key);

      if (typeof valueExpected === 'object') expect(result).toEqual(valueExpected);
      else expect(result).toBe(valueExpected);
      
      (localStorage.getItem as Mock).mockClear();
    }

    const storageDataMock = { 
      item1: JSON.stringify(2),
      item2: JSON.stringify('foo'),
      item3: JSON.stringify(true),
      item4: JSON.stringify([1, 2, 3]),
      item5: JSON.stringify({ name: 'foo', age: 42 }),
    };

    (localStorage.getItem as Mock).mockImplementation((key) => storageDataMock[key]);

    verifyStorageCalls<number>('item1', 2);
    verifyStorageCalls<string>('item2', 'foo');
    verifyStorageCalls<boolean>('item3', true);
    verifyStorageCalls<number[]>('item4', [1, 2, 3]);
    verifyStorageCalls<{ name: string, age: number }>('item5', {
      name: 'foo',
      age: 42,
    });
    expect(storageAdapter.getItem<string>('item6')).toBeNull();
  });

  test('1.5 - Método deleteItem faz uma chamada corretamente ao removeItem do localStorage.', () => {
    storageAdapter.deleteItem('item1');
    expect(localStorage.removeItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledWith('item1');
  });
});