import { FC } from 'react';

const TouristIcon: FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
        >
            <circle cx="12" cy="8" r="4" fill="#624bff" />
            <path
                fill="#624bff"
                d="M5.338 17.32C5.999 14.528 8.772 13 11.643 13h.714c2.871 0 5.644 1.527 6.305 4.32c.128.541.23 1.107.287 1.682c.055.55-.397.998-.949.998H6c-.552 0-1.004-.449-.949-.998c.057-.575.159-1.14.287-1.681Z"
            />
        </svg>
    );
};

export default TouristIcon;