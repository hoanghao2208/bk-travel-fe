import { memo, useEffect } from 'react';
import UserActivityLayout from 'layouts/UserActivityLayout';
import Title from 'components/Title';
import TourItem from 'components/TourItem';
import { Pagination } from 'antd';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Danh sách yêu thích';
    });
    return (
        <UserActivityLayout>
            <div className="love-list">
                <Title title="Danh sách yêu thích" />
                <div className="love-list__content">
                    <div className="love-list__content--item">
                        <TourItem haveBtn={false} bgItem={false} />
                    </div>
                    <div className="love-list__content--item">
                        <TourItem haveBtn={false} bgItem={false} />
                    </div>
                    <div className="love-list__content--item">
                        <TourItem haveBtn={false} bgItem={false} />
                    </div>
                    <div className="love-list__content--item">
                        <TourItem haveBtn={false} bgItem={false} />
                    </div>
                    <div className="love-list__content--item">
                        <TourItem haveBtn={false} bgItem={false} />
                    </div>
                </div>
                <div className="love-list__pagination">
                    <Pagination showSizeChanger defaultCurrent={1} total={20} />
                </div>
            </div>
        </UserActivityLayout>
    );
});

Inner.displayName = 'Love List Inner';

export default Inner;
