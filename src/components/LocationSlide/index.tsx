import { FC } from 'react';
import './styles.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface LocationSlideProps {
    imgURL: string;
    description: string;
}

const LocationSlide: FC<LocationSlideProps> = ({ imgURL, description }) => {
    const navigate = useNavigate();
    return (
        <div className="location-slide">
            <div className="location-slide__bg"></div>
            <img
                src={imgURL}
                alt="location slide"
                className="location-slide__img"
            />
            <div className="location-slide__info">
                <h3 className="location-slide__info--title">
                    BK -
                    <span className="location-slide__info--travel">
                        {' '}
                        Travel
                    </span>
                </h3>
                <p className="location-slide__info--des">{description}</p>
                <Button type="primary" onClick={() => navigate('/find-tour')}>
                    Đặt tour ngay
                </Button>
            </div>
        </div>
    );
};

export default LocationSlide;
