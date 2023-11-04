export enum BodyType {
    JSON = 'json',
    FORM_DATA = 'formData',
    RAW = 'raw',
}

export type BodyTypeEnum = BodyType.JSON | BodyType.FORM_DATA | BodyType.RAW;

export const DEFAULT_BODY_TYPE = BodyType.JSON;
