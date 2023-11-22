import { memo } from 'react';
import Inner from 'views/CartPage/Inner';

const Wrapper = memo(() => {
    return <Inner />;
});

Wrapper.displayName = 'Cart Page';

const CartPage = Wrapper;

export default CartPage;
