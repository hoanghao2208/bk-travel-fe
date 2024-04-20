import { camelCase, snakeCase } from 'lodash';
import moment from 'moment';

export const generateId = (): string => {
    return Math.random().toString(36).slice(2);
};

export const toCamelCase = (str: string): string => {
    return camelCase(str);
};

export const toSnakeCase = (str: string): string => {
    return snakeCase(str);
};

export const formattedDateTime = (timeStamp: number) => {
    const styleDateTime = moment.unix(timeStamp);
    return styleDateTime.format('HH:mm:ss');
}