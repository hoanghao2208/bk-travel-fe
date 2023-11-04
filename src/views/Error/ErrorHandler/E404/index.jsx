// import Button from 'components/Input/Button';
import { memo } from 'react';
import routeConstants from 'route/routeConstant';
import Icon404 from 'views/Error/ErrorHandler/E404/Icon404';

const E404 = memo(() => {
    return (
        <div className="error-page">
            <div className="error-page__logo">
            </div>
            <h1 className="error-page__title">404</h1>
            <div className="error-page__main-content">
                <Icon404 />
                <p className="error-page__text">Nội dung không tồn tại</p>
                <a href={routeConstants.MAIN} className="error-page__link">
                    {/* <Button type="fill" color="primary" size="large">
                        Quay lại trang chủ
                    </Button> */}
                </a>
            </div>
        </div>
    );
});
E404.displayName = 'E404';

export default E404;
