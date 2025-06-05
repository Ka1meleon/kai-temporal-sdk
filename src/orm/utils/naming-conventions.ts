export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export function convertKeysToCamelCase<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToCamelCase(item)) as any;
  }

  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = snakeToCamel(key);
      result[camelKey] = convertKeysToCamelCase(value);
    }
    return result as T;
  }

  return obj;
}

export function convertKeysToSnakeCase<T>(obj: any): T {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToSnakeCase(item)) as any;
  }

  if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = camelToSnake(key);
      result[snakeKey] = convertKeysToSnakeCase(value);
    }
    return result as T;
  }

  return obj;
}
