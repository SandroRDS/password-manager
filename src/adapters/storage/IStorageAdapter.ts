export default interface IStorageAdapter {
  saveItem<ItemStorage>(key: string, value: ItemStorage): void
  getItem<ItemStorage>(key: string): ItemStorage | null
  deleteItem(key: string): void
}