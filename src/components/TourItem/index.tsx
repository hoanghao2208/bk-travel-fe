import { Button } from 'antd';
import HeartIcon from 'assets/icons/HeartIcon';
import { CompassFilled } from '@ant-design/icons';
import { FC, useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

const TourItem: FC = () => {
    const [heart, setHeart] = useState(false);
    return (
        <div className="tour-item">
            <div className="tour-item__header">
                <div
                    className="tour-item__header--icon"
                    onClick={() => setHeart(!heart)}
                >
                    <HeartIcon isClick={heart} />
                </div>
                <img
                    src="/images/slide5.jpg"
                    alt="tour location"
                    className="tour-item__header--img"
                />
            </div>

            <div className="tour-item__center">
                <div className="tour-item__center--date">
                    Ngày 12/10/2023 - 4 ngày, 3 đêm
                </div>
                <div className="tour-item__center--location">
                    <Link to="/">
                        Đà Nẵng – KDL Bà Nà – Sơn Trà – Hội An – La Vang - Động
                        Phong Nha – Làng hương Thủy Xuân - Huế
                    </Link>
                </div>
                <div className="tour-item__center--start">
                    <span>Nơi khởi hành:</span>
                    <span className="tour-item__center--data">
                        TP. Hồ Chí Minh
                    </span>
                </div>
                <div className="tour-item__center--blank">
                    <span>Số chổ trống:</span>
                    <span className="tour-item__center--data">10</span>
                </div>
                <div className="tour-item__center--expire">
                    <span>Hạn đặt chổ:</span>
                    <span className="tour-item__center--data">10/10/2023</span>
                </div>
                <div className="tour-item__center--price">
                    <span>đ </span>
                    <span>10.500.802</span>
                </div>
            </div>

            <div className="tour-item__bottom">
                <Button type="default" shape="round" size="large">
                    Thêm vào giỏ hàng
                </Button>
                <Button
                    type="primary"
                    shape="round"
                    icon={<CompassFilled />}
                    size="large"
                >
                    Đặt tour ngay
                </Button>
            </div>
        </div>
    );
};

export default TourItem;
