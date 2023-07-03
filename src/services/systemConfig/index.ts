import IStorageAdapter from '../../adapters/storage/IStorageAdapter';
import StorageService from '../storage';

export default class SystemConfigService {
  constructor(private storageService: IStorageAdapter = new StorageService){};
  
  getTheme(): string {
    return this.storageService.getItem<string>('theme') as string;
  }

  setTheme(theme: string): void {
    this.storageService.saveItem<string>('theme', theme);
  }
}
