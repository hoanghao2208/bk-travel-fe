import { Button, Spin } from 'antd';
import ErrorIcon from 'assets/icons/ErrorIcon';
import SuccessIcon from 'assets/icons/SuccessIcon';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import './style.scss';

const Inner = memo(({ resultPayment }) => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        if (countdown > 0) {
            const time = setTimeout(() => setCountdown(prev => prev - 1), 1000);
            return () => clearTimeout(time);
        } else {
            navigate(routeConstants.USER_HOME_PAGE);
        }
    }, [countdown, navigate]);

    return (
        <Spin tip="Vui lòng chờ" size="large" spinning={resultPayment === ''}>
            <UserHomePageLayout>
                <div className="payment-success">
                    {resultPayment === '00' ? <SuccessIcon /> : <ErrorIcon />}
                    {resultPayment === '00' ? (
                        <p className="payment-success__desc">
                            Thanh toán thành công, bạn có thể tiếp tục mua sắm
                        </p>
                    ) : (
                        <p className="payment-success__desc">
                            Thanh toán thất bại, vui lòng thử lại
                        </p>
                    )}
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => navigate(routeConstants.USER_HOME_PAGE)}
                    >
                        Trở lại trang chủ sau {countdown} giây.
                    </Button>
                </div>
            </UserHomePageLayout>
        </Spin>
    );
});

Inner.displayName = 'Payment Success Inner';

export default Inner;
