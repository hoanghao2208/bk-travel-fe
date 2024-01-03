import { Button } from 'antd';
import { FC, MouseEvent, ReactElement, memo } from 'react';
import './styles.scss';

interface DetailTourItemProps {
    title: string;
    intro?: string;
    icon: ReactElement;
    buttonTitle: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const DetailTourItem: FC<DetailTourItemProps> = memo(
    ({ title, intro, icon, buttonTitle, onClick }) => {
        return (
            <div className="detail-item">
                <h3 className="detail-item__title">{title}</h3>
                <p className="detail-item__intro">{intro}</p>
                <div className="detail-item__btn">
                    <Button
                        type="primary"
                        icon={icon}
                        shape="round"
                        onClick={onClick}
                    >
                        {buttonTitle}
                    </Button>
                </div>
            </div>
        );
    }
);

DetailTourItem.displayName = 'Detail Tour Item';

export default DetailTourItem;
