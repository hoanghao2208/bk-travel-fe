import { FC, memo } from 'react';
import './styles.scss';
import { DatePicker, Input, Select } from 'antd';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';

interface Options {
    value: string;
    label: string;
}

interface FilterItemProps {
    filterTitle: string;
    isSelectedDate: boolean;
    isPrice: boolean;
    options?: Options[];
}

const FilterItem: FC<FilterItemProps> = memo(
    ({ filterTitle, isSelectedDate, isPrice, options }) => {
        const filterOption = (
            input: string,
            option?: { label: string; value: string }
        ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

        return (
            <div className="filter-items">
                <h4 className="filter-items__title">{filterTitle}</h4>
                {!isPrice && (
                    <div className="filter-items__select">
                        {isSelectedDate ? (
                            <DatePicker
                                placeholder={filterTitle}
                                format={DEFAULT_DISPLAY_DATE_FORMAT}
                            />
                        ) : (
                            <Select
                                showSearch
                                placeholder={filterTitle}
                                optionFilterProp="children"
                                // onChange={onChange}
                                // onSearch={onSearch}
                                filterOption={filterOption}
                                options={options}
                            />
                        )}
                    </div>
                )}
                {isPrice && (
                    <div className="filter-items__select">
                        <Input
                            suffix="VND"
                            placeholder="Mức giá bạn muốn tìm"
                        />
                    </div>
                )}
            </div>
        );
    }
);

FilterItem.displayName = 'Filter Item';

export default FilterItem;
