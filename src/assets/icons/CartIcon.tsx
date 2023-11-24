import { FC, memo } from 'react';

interface CartIconProps {
    hoverCart: boolean;
}

const CartIcon: FC<CartIconProps> = memo(({ hoverCart }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
        >
            <g
                fill="none"
                stroke={hoverCart ? '#1890ff' : 'currentColor'}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            >
                <path d="M6 6h24l-3 13H9m18 4H10L5 2H2" />
                <circle cx="25" cy="27" r="2" />
                <circle cx="12" cy="27" r="2" />
            </g>
        </svg>
    );
});

CartIcon.displayName = 'CartIcon';

export default CartIcon;
