import DiscoverIcon from 'assets/icons/DiscoverIcon';
import LockIcon from 'assets/icons/LockIcon';
import PriceIcon from 'assets/icons/PriceIcon';
import SpeedIcon from 'assets/icons/SpeedIcon';
import ReasonItem from 'components/ReasonItem';
import Title from 'components/Title';
import { FC } from 'react';
import './styles.scss';

const ReasonList: FC = () => {
    return (
        <div className="reason-list">
            <div className="reason-list__title">
                <Title title="Vì sao bạn nên chọn BK Travel" />
            </div>
            <div className="reason-list__items">
                <ReasonItem
                    reasonIcon={<DiscoverIcon />}
                    reasonTitle="Khám phá và tận hưởng"
                    reasonDetail="Chúng tôi tin rằng mỗi chuyến đi là một cơ hội để bạn có thể
                    khám phá bản thân và kết nối với thế giới xung quanh"
                />
                <ReasonItem
                    reasonIcon={<PriceIcon />}
                    reasonTitle="Giá cả hợp lý"
                    reasonDetail="Chúng tôi tin rằng mỗi chuyến đi là một cơ hội để bạn có thể
                    khám phá bản thân và kết nối với thế giới xung quanh"
                />
                <ReasonItem
                    reasonIcon={<SpeedIcon />}
                    reasonTitle="Nhanh chóng, đơn giản"
                    reasonDetail="Chúng tôi tin rằng mỗi chuyến đi là một cơ hội để bạn có thể
                    khám phá bản thân và kết nối với thế giới xung quanh"
                />
                <ReasonItem
                    reasonIcon={<LockIcon />}
                    reasonTitle="Bảo mật, tin cậy"
                    reasonDetail="Chúng tôi tin rằng mỗi chuyến đi là một cơ hội để bạn có thể
                    khám phá bản thân và kết nối với thế giới xung quanh"
                />
            </div>
        </div>
    );
};

export default ReasonList;
