import { memo } from 'react';
import { Button } from 'antd';
import EmptyCart from 'assets/icons/EmptyCart';
import { ShoppingOutlined } from '@ant-design/icons';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const NoItemInCart = memo(() => {
    const navigate = useNavigate();

    return (
        <div className="empty-cart">
            <EmptyCart />
            <div>Giỏ hàng của bạn hiện tại đang trống</div>
            <Button
                type="primary"
                icon={<ShoppingOutlined />}
                onClick={() => navigate('/')}
            >
                Tiếp tục mua sắm
            </Button>
        </div>
    );
});

NoItemInCart.displayName = 'No Item In Cart';

export default NoItemInCart;
