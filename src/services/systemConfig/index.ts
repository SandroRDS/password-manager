import IStorageAdapter from '../../adapters/storage/IStorageAdapter';
import config from '../../config';
import StorageService from '../storage';

export default class SystemConfigService {
  constructor(private storageService: IStorageAdapter = new StorageService()){};
  
  getTheme(): string {
    return this.storageService.getItem<string>('theme') as string;
  }

  setTheme(theme: string): void {
    if (!config.constants.THEMES.includes(theme)) throw new ReferenceError('Tema inexistente.');
    this.storageService.saveItem<string>('theme', theme);
  }
}
