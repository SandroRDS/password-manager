import StorageService from '../storage';

export default class SessionService {
  private storageService = new StorageService;

  isLogged(): boolean {
    return this.storageService.getItem<boolean>('logged') as boolean;  
  }

  loggon(): void {
    this.storageService.saveItem<boolean>('logged', true);
  }

  loggoff(): void {
    this.storageService.saveItem<boolean>('logged', false);
  }
}
