import { FC } from 'react';

const LockIcon: FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 48 48"
        >
            <g fill="none" strokeLinejoin="round" strokeWidth="4">
                <rect
                    width="36"
                    height="22"
                    x="6"
                    y="22"
                    fill="#2F88FF"
                    stroke="#000"
                    rx="2"
                />
                <path
                    stroke="#000"
                    strokeLinecap="round"
                    d="M14 22V14C14 8.47715 18.4772 4 24 4C29.5228 4 34 8.47715 34 14V22"
                />
                <path stroke="#fff" strokeLinecap="round" d="M24 30V36" />
            </g>
        </svg>
    );
};

export default LockIcon;
