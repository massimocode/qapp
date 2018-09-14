// Later on we can implement a NativescriptStorageProvider
export abstract class StorageProvider {
  abstract set<T>(key: string, data: T): void;
  abstract get<T>(key: string): T | null;
}

export class MockStorageProvider implements StorageProvider {
  private storage = new Map<string, string>();

  set<T>(key: string, data: T) {
    this.storage.set(key, JSON.stringify(data));
  }

  get(key: string) {
    const data = this.storage.get(key);
    return data !== undefined ? JSON.parse(data) : null;
  }
}

export class BrowserStorageProvider implements StorageProvider {
  private storage: Storage;

  constructor() {
    try {
      localStorage.setItem("LocalStorageTest", "true");
      this.storage = localStorage;
    } catch (e) {
      this.storage = sessionStorage;
    }
  }

  set<T>(key: string, data: T) {
    this.storage.setItem(key, JSON.stringify(data));
  }
  get(key: string) {
    const data = this.storage.getItem(key);
    return data !== null ? JSON.parse(data) : null;
  }
}
