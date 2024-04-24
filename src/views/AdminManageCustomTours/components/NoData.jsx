import NoDataIcon from 'assets/icons/NoDataIcon';
import { memo } from 'react';
import './styles.scss';

const NoData = memo(() => {
    return (
        <div className="no-data">
            <NoDataIcon />
            <span>Hiện tại không có dữ liệu</span>
        </div>
    );
});

NoData.displayName = 'No Data';

export default NoData;
