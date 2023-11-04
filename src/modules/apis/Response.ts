import { forEach, isArray, isObject } from 'lodash';
import { toCamelCase } from 'utils/function/format';

export interface IResponse {
    isSuccess: boolean;
    errorCode: number;
    message: string;
    data: any;
    messageCode: string;
}

export interface IResponseData<T> {
    isSuccess: boolean;
    errorCode?: number;
    message?: string;
    messageCode?: string;
    data?: T | null;
}

class ResponseModel implements IResponse {
    isSuccess = false;
    errorCode = 0;
    message = '';
    data = null;
    messageCode = '';
}

export const prepareJsonResponse = (response: any): any => {
    let result = null as any;
    if (isArray(response)) {
        result = response.map((item: any) => prepareJsonResponse(item));
    } else if (isObject(response)) {
        result = {};
        forEach(response, (value: any, key: string) => {
            result[toCamelCase(key)] = prepareJsonResponse(value);
        });
    } else {
        result = response;
    }
    return result;
};

export const getResponse = (responseBody: any, error?: Error): IResponse => {
    let response = new ResponseModel();
    response.isSuccess = responseBody?.error_code === 0;
    response.errorCode = responseBody?.error_code || 0;
    response.message = responseBody?.message || '';
    response.data = responseBody?.data;
    response.messageCode = responseBody?.message_code || '';
    if (error) {
        response.message = String(error);
    }
    return response;
};

class ResponseParser extends ResponseModel {
    static parse = async (response: Response) => {
        const contentType = response.headers.get('content-type');
        // handle application/json
        if (contentType?.includes('application/json')) {
            const jsonData = await response.json();
            let data: IResponse = getResponse({
                ...jsonData,
                data: prepareJsonResponse(jsonData.data),
            });
            return data;
        }
        // handle text/*
        else if (contentType === null) {
            const textData = await response.text();
            const statusCode = response.status;
            return getResponse({
                error_code: statusCode === 200 ? 0 : statusCode,
                data: textData,
            });
        }
        // handle image/*
        else if (
            contentType?.includes('image') ||
            contentType?.includes('pdf')
        ) {
            const data = await response.blob();
            return getResponse({
                error_code: response.status === 200 ? 0 : response.status,
                data,
            });
        } else {
            throw new Error(`Content type ${contentType} is not supported`);
        }
    };
}

export default ResponseParser;
