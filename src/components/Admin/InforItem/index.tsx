import React, { FC, memo } from 'react';
import './styles.scss';

interface InforItemProps {
    itemTitle: string;
    count: number;
    unit: string;
    icon: React.ReactNode;
}

const InforItem: FC<InforItemProps> = memo(
    ({ itemTitle, count, unit, icon }) => {
        return (
            <div className="infor-item">
                <div className="infor-item__header">
                    <h3 className="infor-item__header--title">{itemTitle}</h3>
                    <span className="infor-item__header--icon">{icon}</span>
                </div>
                <div className="infor-item__footer">
                    <h2 className="infor-item__footer--count">{count}</h2>
                    <span className="infor-item__footer--unit">{unit}</span>
                </div>
            </div>
        );
    }
);

InforItem.displayName = 'Infor Item';

export default InforItem;
