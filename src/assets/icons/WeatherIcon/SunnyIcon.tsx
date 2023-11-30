import { FC } from 'react';

const SunnyIcon: FC = () => {
    return (
        <svg
            width="290"
            height="282"
            viewBox="0 0 290 282"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_f_929_3547)">
                <rect
                    x="77"
                    y="77"
                    width="135.929"
                    height="128"
                    rx="64"
                    fill="#FFEF9A"
                />
            </g>
            <g filter="url(#filter1_i_929_3547)">
                <path
                    d="M205 141C205 174.469 178.121 201.602 144.965 201.602C111.808 201.602 84.9292 174.469 84.9292 141C84.9292 107.531 111.808 80.3982 144.965 80.3982C178.121 80.3982 205 107.531 205 141Z"
                    fill="url(#paint0_linear_929_3547)"
                />
            </g>
            <defs>
                <filter
                    id="filter0_f_929_3547"
                    x="0"
                    y="0"
                    width="289.929"
                    height="282"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation="38.5"
                        result="effect1_foregroundBlur_929_3547"
                    />
                </filter>
                <filter
                    id="filter1_i_929_3547"
                    x="84.9292"
                    y="80.3982"
                    width="120.071"
                    height="126.204"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="5" />
                    <feGaussianBlur stdDeviation="9" />
                    <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                    />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.81 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_929_3547"
                    />
                </filter>
                <linearGradient
                    id="paint0_linear_929_3547"
                    x1="135.845"
                    y1="173.986"
                    x2="185.945"
                    y2="86.9399"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FF9900" />
                    <stop offset="1" stopColor="#FFEE94" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default SunnyIcon;
