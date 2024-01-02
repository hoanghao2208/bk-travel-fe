import axios from 'axios';
import { forEach, isArray, isObject } from 'lodash';
import { BodyType, BodyTypeEnum, DEFAULT_BODY_TYPE } from 'modules/apis/config';
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
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    headers?: any;
}

class ApiBase {
    private _baseUrl = 'http://localhost:5000/api';

    get(url: string, options: IApiOptions = {}) {
        return this.call(url, {
            ...options,
            method: 'GET',
        });
    }

    post = (url: string, body?: any, options: IApiOptions = {}) => {
        const _body = this.createBody(
            body,
            options?.bodyType || DEFAULT_BODY_TYPE
        );
        return this.call(url, {
            ...options,
            body: _body ? _body : undefined,
            method: 'POST',
        });
    };

    put = (url: string, body?: any, options: IApiOptions = {}) => {
        const _body = this.createBody(
            body,
            options?.bodyType || DEFAULT_BODY_TYPE
        );
        return this.call(url, {
            ...options,
            body: _body ? _body : undefined,
            method: 'PUT',
        });
    };

    delete = (url: string, options: IApiOptions = {}) => {
        return this.call(url, {
            ...options,
            method: 'DELETE',
        });
    };

    call = async (pathUrl: string, rawOptions: IApiOptions) => {
        let url = this._baseUrl + pathUrl;
        if (rawOptions.params) {
            const paramsString = new URLSearchParams(
                prepareData(rawOptions.params)
            ).toString();
            url = url + '?' + paramsString;
        }
        try {
            let options = this.createHeader(rawOptions);
            let response = await axios(url, {
                url,
                method: options.method,
                headers: options.headers,
                data: options.body,
                params: options.params,
            });
            return response;
        } catch (error: any) {
            return error?.response;
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
}

export default ApiBase;
