import { vi, Mock } from 'vitest';
import IStorageAdapter from '../../src/adapters/storage/IStorageAdapter';
import StorageService from '../../src/services/storage';

describe('1 - Testando correto funcionamento da classe StorageService.', () => {
  const storageAdapterMock: IStorageAdapter = {
    saveItem: vi.fn(),
    getItem: vi.fn(),
    deleteItem: vi.fn(),
  };

  const storageService = new StorageService(storageAdapterMock);

  test('1.1 - O método saveItem faz chamada ao método saveItem do StorageAdapter passado por parâmetro.', () => {
    storageService.saveItem<string>('item1', 'foo');
    expect(storageAdapterMock.saveItem).toBeCalledTimes(1);
    expect(storageAdapterMock.saveItem).toBeCalledWith('item1', 'foo');
    expect(storageAdapterMock.saveItem).not.toBeCalledWith('item2', 42);
  });

  test('1.2 - O método getItem faz chamada ao método getItem do StorageAdapter passado por parâmetro.', () => {
    const verifyStorageCalls = <ItemStorage>(key: string, valueExpected: ItemStorage) => {
      const result = storageService.getItem<ItemStorage>(key);
      expect(storageAdapterMock.getItem).toBeCalledTimes(1);
      expect(storageAdapterMock.getItem).toBeCalledWith(key);

      if (typeof valueExpected === 'object') expect(result).toEqual(valueExpected);
      else expect(result).toBe(valueExpected);
      
      (storageAdapterMock.getItem as Mock).mockClear();
    }

    const storageDataMock = {
      item1: 2,
      item2: 'foo',
      item3: true,
      item4: [1, 2, 3],
      item5: { name: 'foo', age: 42 },
    };

    (storageAdapterMock.getItem as Mock).mockImplementation((key) => storageDataMock[key]);
    
    verifyStorageCalls<number>('item1', 2);
    verifyStorageCalls<string>('item2', 'foo');
    verifyStorageCalls<boolean>('item3', true);
    verifyStorageCalls<number[]>('item4', [1, 2, 3]);
    verifyStorageCalls<{ name: string, age: number }>('item5', {
      name: 'foo',
      age: 42,
    });
  });

  test('1.3 - O método deleteItem faz chamada ao método deleteItem do StorageAdapter passado por parâmetro.', () => {
    storageService.deleteItem('item1');
    expect(storageAdapterMock.deleteItem).toBeCalledTimes(1);
    expect(storageAdapterMock.deleteItem).toBeCalledWith('item1');
  });
});
