import { SupabaseClient } from '@supabase/supabase-js';

import { IBaseRepository } from './base-repository.interface';

export abstract class BaseRepository<TDto, TTableRow> implements IBaseRepository<TDto, TTableRow> {
  constructor(protected supabase: SupabaseClient) {}

  convertToDto(tableRow: TTableRow): TDto {
    const result: any = {};
    for (const [key, value] of Object.entries(tableRow as any)) {
      const camelKey = this.snakeToCamel(key);
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !(value instanceof Date)
      ) {
        if (this.isJsonbField(key)) {
          result[camelKey] = value;
        } else {
          result[camelKey] = this.convertObjectToCamelCase(value);
        }
      } else {
        result[camelKey] = value;
      }
    }
    return result as TDto;
  }

  convertToTableRow(dto: Partial<TDto>): Partial<TTableRow> {
    const result: any = {};
    for (const [key, value] of Object.entries(dto as any)) {
      const snakeKey = this.camelToSnake(key);
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        !(value instanceof Date)
      ) {
        if (this.isJsonbField(snakeKey)) {
          result[snakeKey] = value;
        } else {
          result[snakeKey] = this.convertObjectToSnakeCase(value);
        }
      } else {
        result[snakeKey] = value;
      }
    }
    return result as Partial<TTableRow>;
  }

  protected snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }

  protected camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
  }

  protected convertObjectToCamelCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.convertObjectToCamelCase(item));
    }
    if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const camelKey = this.snakeToCamel(key);
        result[camelKey] = this.convertObjectToCamelCase(value);
      }
      return result;
    }
    return obj;
  }

  protected convertObjectToSnakeCase(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map(item => this.convertObjectToSnakeCase(item));
    }
    if (obj !== null && typeof obj === 'object' && !(obj instanceof Date)) {
      const result: any = {};
      for (const [key, value] of Object.entries(obj)) {
        const snakeKey = this.camelToSnake(key);
        result[snakeKey] = this.convertObjectToSnakeCase(value);
      }
      return result;
    }
    return obj;
  }

  protected isJsonbField(fieldName: string): boolean {
    const jsonbFields = ['categories', 'items', 'messages', 'tool_calls', 'preferences', 'details'];
    return jsonbFields.includes(fieldName);
  }
}
