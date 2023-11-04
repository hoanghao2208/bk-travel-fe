import Message from 'components/Message';
import { forEach, isArray, isObject } from 'lodash';
import { BodyType, BodyTypeEnum, DEFAULT_BODY_TYPE } from 'modules/apis/config';
import messageCodes from 'modules/apis/messageCode';
import ResponseParser, { getResponse, IResponse } from 'modules/apis/Response';
import { setError } from 'reducers/error/function';
import { getToken } from 'reducers/token/function';
import { toSnakeCase } from 'utils/function/format';

const prepareData = (response: any): any => {
    let result = null as any;
    if (isArray(response)) {
        result = response.map((item: any) => prepareData(item));
    } else if (isObject(response)) {
        result = {};
        forEach(response, (value, key) => {
            if (key === 'file') {
                result[key] = value;
            } else {
                result[toSnakeCase(key)] = prepareData(value);
            }
        });
    } else {
        result = response;
    }
    return result;
};

interface IApiOptions {
    bodyType?: BodyTypeEnum;
    params?: any;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: any;
}

class ApiBase {
    private _baseUrl = process.env.REACT_APP_API_URL + '/api';

    get(
        url: string,
        options: IApiOptions = {},
        customHandleError?: (err: IResponse) => IResponse
    ) {
        return this.call(
            url,
            {
                ...options,
                method: 'GET',
            },
            customHandleError
        );
    }

    post = (
        url: string,
        body?: any,
        options: IApiOptions = {},
        customHandleError?: (err: IResponse) => IResponse
    ) => {
        const _body = this.createBody(
            body,
            options?.bodyType || DEFAULT_BODY_TYPE
        );
        return this.call(
            url,
            {
                ...options,
                body: _body ? _body : undefined,
                method: 'POST',
            },
            customHandleError
        );
    };

    put = (
        url: string,
        body?: any,
        options: IApiOptions = {},
        customHandleError?: (err: IResponse) => IResponse
    ) => {
        const _body = this.createBody(
            body,
            options?.bodyType || DEFAULT_BODY_TYPE
        );
        return this.call(
            url,
            {
                ...options,
                body: _body ? _body : undefined,
                method: 'PUT',
            },
            customHandleError
        );
    };

    delete = (
        url: string,
        options: IApiOptions = {},
        customHandleError?: (err: IResponse) => IResponse
    ) => {
        return this.call(
            url,
            {
                ...options,
                method: 'DELETE',
            },
            customHandleError
        );
    };

    call = async (
        pathUrl: string,
        rawOptions: IApiOptions,
        customHandleError?: (err: IResponse) => IResponse
    ) => {
        let url = this._baseUrl + pathUrl;
        if (rawOptions.params) {
            const paramsString = new URLSearchParams(
                prepareData(rawOptions.params)
            ).toString();
            url = url + '?' + paramsString;
        }
        try {
            let options = this.createHeader(rawOptions);
            let response = await fetch(url, {
                ...options,
            });
            let data = await ResponseParser.parse(response);
            if (!data.isSuccess && customHandleError) {
                data = customHandleError(data);
            }
            if (!data.isSuccess) {
                return this.handleError(data);
            }
            return data;
        } catch (error: any) {
            const e = error instanceof Error ? error : new Error(error);
            const response = getResponse(null, e);
            return this.handleError(response);
        }
    };

    createBody = (data: any, type: string) => {
        let formattedData = prepareData(data);
        switch (type) {
            case BodyType.JSON:
                return JSON.stringify(formattedData);
            case BodyType.FORM_DATA:
                // eslint-disable-next-line no-case-declarations
                let formData = new FormData();
                Object.keys(formattedData).forEach((key: string) => {
                    formData.append(key, formattedData[key] || '');
                });
                return formData;
            default:
                return data;
        }
    };

    createHeader = ({ bodyType = BodyType.JSON, ...options }: IApiOptions) => {
        const newOptions: IApiOptions = options;
        newOptions.headers = newOptions.headers || {};
        if (bodyType === BodyType.JSON && !newOptions.headers['Content-Type']) {
            newOptions.headers['Content-Type'] = 'application/json';
        }
        const token = getToken();
        if (token) {
            newOptions.headers.Authorization = `Bearer ${token}`;
        }
        return newOptions;
    };

    handleError = (error: IResponse) => {
        if ([401].includes(error.errorCode)) {
            setError(error.errorCode, error.message);
        }
        if (error.messageCode) {
            Message.sendError(
                messageCodes[error.messageCode] || messageCodes.default
            );
        }
        return error;
    };
}

export default ApiBase;
