import { FC, ReactElement, memo } from 'react';
import './styles.scss';

interface ReasonItemProps {
    reasonIcon: ReactElement;
    reasonTitle: string;
    reasonDetail: string;
}

const ReasonItem: FC<ReasonItemProps> = memo(
    ({ reasonIcon, reasonTitle, reasonDetail }) => {
        return (
            <div className="reason">
                <div className="reason__icon">{reasonIcon}</div>
                <h2 className="reason__title">{reasonTitle}</h2>
                <p className="reason__detail">{reasonDetail}</p>
            </div>
        );
    }
);

ReasonItem.displayName = 'Reason Item';

export default ReasonItem;
