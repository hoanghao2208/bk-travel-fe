import { FC } from 'react';

const RightHandIcon: FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 48 48"
        >
            <g
                fill="none"
                stroke="#b71010"
                strokeLinejoin="round"
                strokeWidth="4"
            >
                <path d="M10.026 40.974v-22h-6v22z" />
                <path
                    d="M10.026 18.974c7.123-6.52 11.251-10.26 12.384-11.222c1.7-1.443 3.62-.837 3.62 2.775s-5.285 5.695-5.285 8.447c-.004.016 6.756.017 20.277.003a3 3 0 0 1 3.004 2.998v.003a3.004 3.004 0 0 1-3.004 3.004h-8.01c-1.208 7.973-1.875 12.307-2 13.004c-.188 1.044-1.185 2.988-4.054 2.988H10.026z"
                    clipRule="evenodd"
                />
            </g>
        </svg>
    );
};

export default RightHandIcon;
