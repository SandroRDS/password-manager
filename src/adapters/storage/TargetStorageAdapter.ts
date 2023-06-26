export default interface TargetStorageAdapter {
  saveItem<ItemStorage>(key: string, value: ItemStorage): Promise<void>
  getItem<ItemStorage>(key: string): Promise<ItemStorage | null>
  deleteItem(key: string):  Promise<void>
}