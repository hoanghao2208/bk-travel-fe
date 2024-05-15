import { Button, Tooltip } from 'antd';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import '../style.scss';

const TourItem: FC = memo(() => {
    return (
        <div className="tour-item" style={{ backgroundColor: 'white' }}>
            <div className="tour-item__header">
                <img
                    src="/images/slide1.jpg"
                    alt="tour location"
                    className="tour-item__header--img"
                    // onClick={handleNavigate}
                />
            </div>
            <div className="tour-item__center">
                <div className="tour-item__center--date">
                    Ngày 13/05/2024 - 19:00
                </div>
                <div className="tour-item__center--location">
                    <Tooltip title="Lương Kim Khánh">
                        <Link to="/">Lương Kim Khánh</Link>
                    </Tooltip>
                </div>
                <div className="tour-item__center--start">
                    <span>Nơi khởi hành:</span>
                    <span className="tour-item__center--data">
                        TP. Hồ Chí Minh
                    </span>
                </div>
            </div>

            <div className="tour-item__bottom">
                <Button
                    type="default"
                    shape="round"
                    danger
                    size="large"
                    // onClick={() => handleOpenAddModal(tourId)}
                >
                    Yêu cầu hủy
                </Button>
                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    // onClick={() => handleOpenOrderModal(tourId)}
                >
                    Trang nhiệm vụ
                </Button>
            </div>
        </div>
    );
});

TourItem.displayName = 'TourGuide Tour Item';

export default TourItem;
