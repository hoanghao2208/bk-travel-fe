import { camelCase, snakeCase } from 'lodash';

export const generateId = (): string => {
    return Math.random().toString(36).slice(2);
};

export const toCamelCase = (str: string): string => {
    return camelCase(str);
};

export const toSnakeCase = (str: string): string => {
    return snakeCase(str);
};
