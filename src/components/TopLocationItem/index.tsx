import { FC, memo } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

const TopLoationItem: FC = memo(() => {
    return (
        <div className="top-items">
            <h3 className="top-items__location">Đà Nẵng</h3>
            <div className="top-items__list">
                <div className="top-items__list--item">
                    <Link to="/">
                        <img
                            src="/images/slide5.jpg"
                            alt="top location"
                            className="top-items__list--img"
                        />
                    </Link>
                    <div className="top-items__list--des">
                        <Link to="/" className="top-items__list--title">
                            Bà Nà Hills
                        </Link>
                        <p className="top-items__list--detail">
                            Thông tin chi tiết...
                        </p>
                    </div>
                </div>
                <div className="top-items__list--item">
                    <Link to="/">
                        <img
                            src="/images/slide5.jpg"
                            alt="top location"
                            className="top-items__list--img"
                        />
                    </Link>
                    <div className="top-items__list--des">
                        <Link to="/" className="top-items__list--title">
                            Bà Nà Hills
                        </Link>
                        <p className="top-items__list--detail">
                            Thông tin chi tiết...
                        </p>
                    </div>
                </div>
                <div className="top-items__list--item">
                    <Link to="/">
                        <img
                            src="/images/slide5.jpg"
                            alt="top location"
                            className="top-items__list--img"
                        />
                    </Link>
                    <div className="top-items__list--des">
                        <Link to="/" className="top-items__list--title">
                            Bà Nà Hills
                        </Link>
                        <p className="top-items__list--detail">
                            Thông tin chi tiết...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
});

TopLoationItem.displayName = 'TopLocationItem';

export default TopLoationItem;
