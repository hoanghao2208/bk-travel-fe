import { FC, memo } from 'react';
import '../styles.scss';

interface Attraction {
    name: string;
}

interface CustomItemProps {
    status: 'PENDING' | 'SUCCESS' | 'REJECTED';
    tourName: string;
    departure: string;
    destinations: string[];
    attractions: Attraction[];
    numberCustomer: number;
    departureTime: string;
    departureDate: string;
    price?: number;
    time: string;
    note: string;
}

const CustomItem: FC<CustomItemProps> = memo(
    ({
        status,
        tourName,
        departure,
        destinations,
        attractions,
        numberCustomer,
        departureTime,
        departureDate,
        price,
        time,
        note,
    }) => {
        const attractionNames = attractions.map(attraction => attraction.name);
        const nameString = attractionNames.join(', ');

        return (
            <div className="custom-item">
                <h3>{tourName}</h3>
                <div className="custom-item--inf">
                    <span>Điểm khởi hành:</span>
                    <span>{departure}</span>
                </div>
                <div className="custom-item--inf">
                    <span>Các điểm đến:</span>
                    <span>{destinations}</span>
                </div>
                <div className="custom-item--inf">
                    <span>Các điểm đến:</span>
                    <span>{nameString}</span>
                </div>
                <div className="custom-item--inf">
                    <span>Số du khách:</span>
                    <span>{numberCustomer}</span>
                </div>
                <div className="custom-item--inf">
                    <span>Khởi hành:</span>
                    <span>
                        {departureTime} - {departureDate} - {time}
                    </span>
                </div>
                {status === 'SUCCESS' && (
                    <div className="custom-item--inf">
                        <span>Giá tour:</span>
                        <span>{price?.toLocaleString()} VNĐ</span>
                    </div>
                )}
                <div className="custom-item--inf">
                    <span>{status === 'REJECTED' ? 'Lý do:' : 'Lưu ý:'}</span>
                    <span>{note}</span>
                </div>
            </div>
        );
    }
);

CustomItem.displayName = 'Custom Item';

export default CustomItem;
