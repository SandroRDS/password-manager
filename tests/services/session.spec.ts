import { Mock, vi } from 'vitest';
import SessionService from '../../src/services/session';
import storageMock from '../mocks/StorageMock';

describe('1 - Testando correto funcionamento da classe SessionService.', () => {
  const sessionService = new SessionService(storageMock);

  beforeEach(() => vi.resetAllMocks());

  test('1.1 - O método isLogged faz chamada ao item "logged" do StorageService e retorna um boolean, informando se o usuário está ou não logado.', () => {
    storageMock.getItem.mockReturnValueOnce(true).mockReturnValueOnce(false); 
    
    const result1 = sessionService.isLogged();
    const result2 = sessionService.isLogged();

    expect(storageMock.getItem).toBeCalledTimes(2);
    expect(storageMock.getItem).toBeCalledWith('logged');
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  test('1.2 - O método loggon modifica o item logged do StorageService trocando seu valor para true.', () => {
    sessionService.loggon();

    expect(storageMock.saveItem).toBeCalledTimes(1);
    expect(storageMock.saveItem).toBeCalledWith('logged', true);
  });

  test('1.3 - O método loggoff modifica o item logged do StorageService trocando seu valor para false.', () => {
    sessionService.loggoff();

    expect(storageMock.saveItem).toBeCalledTimes(1);
    expect(storageMock.saveItem).toBeCalledWith('logged', false);
  });
});