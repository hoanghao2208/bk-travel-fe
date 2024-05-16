import dayjs from 'dayjs';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import tourService from 'services/tourService';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import { ITour } from 'utils/type';
import './styles.scss';

dayjs.extend(isSameOrAfter);

interface ProductItemProps {
    tourId: number;
    adultQuantity: number;
    childQuantity: number;
    setIsExprired: (value: boolean) => void;
}

const ProductItem: FC<ProductItemProps> = memo(
    ({ tourId, adultQuantity, childQuantity, setIsExprired }) => {
        const [tourInformation, setTourInformation] = useState<ITour>();

        const getTourInformation = useCallback(async () => {
            try {
                const response = await tourService.getOneTour(tourId);
                if (response?.status === 200) {
                    setTourInformation(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }, [tourId]);

        useEffect(() => {
            getTourInformation();
        }, [getTourInformation]);

        if (
            tourInformation &&
            !dayjs(tourInformation.deadline_book_time).isSameOrAfter(
                dayjs().startOf('day')
            )
        ) {
            setIsExprired(true);
            return null;
        }

        return (
            <div className="product-item">
                <div className="product-item__img">
                    <img
                        src={
                            tourInformation?.cover_image ||
                            '/images/cover_image_df.jpg'
                        }
                        alt="product-img"
                    />
                </div>
                <div className="product-item__detail">
                    <h3 className="product-item__detail--title">
                        {tourInformation?.name}
                    </h3>
                    <div className="product-item__detail--inf1">
                        <span className="product-item__detail--inf1-col1">
                            Ngày{' '}
                            {dayjs(tourInformation?.departure_date).format(
                                DEFAULT_DISPLAY_DATE_FORMAT
                            )}
                        </span>
                        <span className="product-item__detail--inf1-col2">
                            {tourInformation?.time}
                        </span>
                        <span className="product-item__detail--inf1-col3">
                            Khởi hành {tourInformation?.departure_place}
                        </span>
                    </div>
                    <div className="product-item__detail--inf2">
                        <span className="product-item__detail--inf2-col1">
                            Số lượng hành khách:{' '}
                        </span>
                        <span className="product-item__detail--inf2-col2">
                            {adultQuantity} người lớn
                        </span>
                        {childQuantity !== 0 && (
                            <span className="product-item__detail--inf2-col3">
                                {childQuantity} trẻ em
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }
);

ProductItem.displayName = 'Product Item';

export default ProductItem;
