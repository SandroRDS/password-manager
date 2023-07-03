import { vi } from 'vitest';
import SystemConfigService from '../../src/services/systemConfig';
import storageMock from '../mocks/StorageMock';

describe('1 - Testando correto funcionamento da classe SystemConfigService', () => {
  const systemConfigService = new SystemConfigService(storageMock);

  beforeEach(() => vi.resetAllMocks());

  test('1.1 - O método getTheme acessa a chave "theme" do StorageService e retorna o tema atual da plataforma.', () => {
    storageMock.getItem.mockReturnValueOnce('dark').mockReturnValueOnce('white');
    const result1 = systemConfigService.getTheme();
    const result2 = systemConfigService.getTheme();

    expect(storageMock.getItem).toBeCalledTimes(2);
    expect(storageMock.getItem).toBeCalledWith('theme');
    expect(result1).toBe('dark');
    expect(result2).toBe('white');
  });

  test('1.2 - O método setTheme modifica o valor da chave ', () => {
    
  });
});