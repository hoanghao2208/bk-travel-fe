import _toNumber from 'lodash/toNumber';
import moment from 'moment';

export const DATA_SEPARATOR = ',';

export const DEFAULT_PAGE_SIZE = 5;

export const DEFAULT_DISPLAY_DATE_FORMAT = 'DD/MM/YYYY';

export const CURRENT_YEAR = _toNumber(moment().format('YYYY'));

export const NUMBER_ITEMS_PER_PAGE = 10;

export const EMAIL_VALIDATE =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_VALIDATE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const NAME_VALIDATE = /^\S*$/;

export const VN_PHONE_NUMBER = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
