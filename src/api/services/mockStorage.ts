// Solo para testing - remover cuando AsyncStorage funcione
const storage: Record<string, string> = {};

const mockStorage = {
  async getItem(key: string): Promise<string | null> {
    return storage[key] || null;
  },
  async setItem(key: string, value: string): Promise<void> {
    storage[key] = value;
  },
  async removeItem(key: string): Promise<void> {
    delete storage[key];
  },
  async multiSet(pairs: [string, string][]): Promise<void> {
    pairs.forEach(([key, value]) => {
      storage[key] = value;
    });
  },
  async multiRemove(keys: string[]): Promise<void> {
    keys.forEach(key => {
      delete storage[key];
    });
  },
};

export default mockStorage;
