import _toNumber from 'lodash/toNumber';
import moment from 'moment';

export const DATA_SEPARATOR = ',';

export const DEFAULT_PAGE_SIZE = 5;

export const DEFAULT_DISPLAY_DATE_FORMAT = 'DD/MM/YYYY';

export const CURRENT_YEAR = _toNumber(moment().format('YYYY'));

export const NUMBER_ITEMS_PER_PAGE = 10;
