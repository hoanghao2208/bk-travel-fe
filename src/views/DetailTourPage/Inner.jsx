import {
    CommentOutlined,
    SearchOutlined,
    SendOutlined,
} from '@ant-design/icons';
import { FloatButton, Image, Rate } from 'antd';
import LoveIcon from 'assets/icons/LoveIcon';
import LoveRedIcon from 'assets/icons/LoveRedIcon';
import StarIcon from 'assets/icons/StarIcon';
import Comment from 'components/Comment';
import DetailTourItem from 'components/DetailTourItem';
import Message from 'components/Message';
import Title from 'components/Title';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomerId, useToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import './style.scss';

const Inner = memo(({ tourData, loveList, setLoveList, isGetLoveList }) => {
    useEffect(() => {
        document.title = 'Chi tiết tour';
    });
    const token = useToken();
    const navigate = useNavigate();
    const { tour_id } = useParams();
    const userId = getCustomerId();

    const handleWishListTour = useCallback(async () => {
        if (token === '') {
            navigate(routeConstants.LOGIN);
            Message.sendWarning(
                'Vui lòng đăng nhập để thực hiện chức năng này'
            );
            return;
        } else {
            const tourId = parseInt(tour_id);
            if (!loveList.includes(tourId)) {
                const response = await userService.addToWishList(
                    userId,
                    tourId
                );
                if (response?.status === 201) {
                    setLoveList(prev => [...prev, tourId]);
                }
            } else {
                const response = await userService.removeFromWishList(
                    userId,
                    tourId
                );
                if (response?.status === 200) {
                    setLoveList(prev => prev.filter(id => id !== tourId));
                }
            }
        }
    }, [loveList, navigate, setLoveList, token, tour_id, userId]);

    if (
        !tourData ||
        !tourData.description ||
        !tourData.list_image ||
        isGetLoveList === false
    ) {
        return null;
    }

    const imageList = JSON.parse(tourData.list_image);
    const descriptionParagraphs = tourData?.description.split('\r\n\r\n');

    return (
        <UserHomePageLayout>
            <div className="tour-detail">
                <div className="tour-detail__header">
                    <h3 className="tour-detail__header--title">
                        {tourData?.name}
                    </h3>
                    <div className="tour-detail__header--bottom">
                        <p className="tour-detail__header--rate">
                            <span className="tour-detail__header--star">
                                <StarIcon />
                                <span>4.8</span>
                            </span>
                            <span className="tour-detail__header--rating">
                                (1234 lượt đánh giá)
                            </span>
                            <span className="tour-detail__header--count">
                                5000+ Tour đã được đặt
                            </span>
                        </p>
                        <p
                            className="tour-detail__header--like"
                            onClick={handleWishListTour}
                        >
                            {!loveList.includes(parseInt(tour_id)) ? (
                                <LoveIcon />
                            ) : (
                                <LoveRedIcon />
                            )}
                            <span
                                className={`${
                                    loveList.includes(parseInt(tour_id))
                                        ? 'tour-detail__header--liked'
                                        : ''
                                }`}
                            >
                                Yêu thích
                            </span>
                        </p>
                    </div>
                </div>
                <div className="tour-detail__wrapper">
                    <div className="tour-detail__content">
                        <div className="tour-detail__book-tour">
                            <div className="tour-detail__book-tour--image">
                                <Image
                                    src={tourData?.cover_image}
                                    height={500}
                                />
                            </div>
                        </div>
                        <div className="tour-detail__infor">
                            <div className="tour-detail__infor--details">
                                <Title title="Điểm nhấn" />
                                <p>{tourData?.highlight}</p>
                            </div>
                            <div className="tour-detail__infor--details">
                                <Title title="Chi tiết tour" />
                                {descriptionParagraphs.map(
                                    (paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    )
                                )}
                            </div>
                            <div className="tour-detail__infor--details">
                                <Title title="Những điều cần lưu ý" />
                                <p>{tourData?.note}</p>
                            </div>
                            <div className="tour-detail__infor--details">
                                <Title title="Một số hình ảnh của tour du lịch" />
                                <Image.PreviewGroup>
                                    {imageList.map((image, index) => (
                                        <div
                                            className="tour-detail__infor--img"
                                            key={index}
                                        >
                                            <Image src={image} height={400} />
                                        </div>
                                    ))}
                                </Image.PreviewGroup>
                            </div>
                        </div>
                    </div>
                    <div className="tour-detail__feature">
                        <DetailTourItem
                            title={`Từ ${tourData?.price.toLocaleString()} VNĐ`}
                            icon={<SendOutlined />}
                            buttonTitle="Đặt tour ngay"
                        />
                        <DetailTourItem
                            title="Lịch trình tour"
                            intro="Khám phá lịch trình tour ngay!"
                            icon={<SearchOutlined />}
                            buttonTitle="Xem lịch trình tour"
                            onClick={() =>
                                navigate(`/tour/schedule/detail/${tour_id}`)
                            }
                        />
                        <DetailTourItem
                            title="Liên hệ với chúng tôi"
                            intro="Bạn đang gặp vấn đề? Liên hệ ngay với chúng tôi!"
                            icon={<CommentOutlined />}
                            buttonTitle="Liên hệ với chúng tôi"
                        />
                    </div>
                </div>
                <div className="tour-detail__rating">
                    <Title title="Đánh giá" />
                    <div className="tour-detail__rating--header">
                        <div>
                            <span className="tour-detail__rating--avg">
                                <span>4.8/</span>
                                <span>5</span>
                            </span>
                            <Rate disabled allowHalf defaultValue={4.8} />
                            <span className="tour-detail__rating--total">
                                (1234 lượt đánh giá)
                            </span>
                        </div>
                        <span className="tour-detail__rating--see-all">
                            Xem tất cả đánh giá
                        </span>
                    </div>
                    <div className="tour-detail__rating--content">
                        <Comment
                            rate={4}
                            date="13/05/2023"
                            content="Khi đến nơi, bạn cần điền thông tin vào mẫu đơn bảo hiểm. Lưu ý, việc cung cấp thông tin cá nhân (VD: Số hộ chiếu, ngày sinh) chỉ phục vụ cho mục đích bảo hiểm, đây là yêu cầu bắt buộc để đảm bảo an toàn cho bạn trong suốt chuyến tham quan."
                        />
                        <Comment
                            rate={4.5}
                            date="13/05/2023"
                            content="Khi đến nơi, bạn cần điền thông tin vào mẫu đơn bảo hiểm. Lưu ý, việc cung cấp thông tin cá nhân (VD: Số hộ chiếu, ngày sinh) chỉ phục vụ cho mục đích bảo hiểm, đây là yêu cầu bắt buộc để đảm bảo an toàn cho bạn trong suốt chuyến tham quan."
                        />
                        <Comment
                            rate={5}
                            date="13/05/2023"
                            content="Khi đến nơi, bạn cần điền thông tin vào mẫu đơn bảo hiểm. Lưu ý, việc cung cấp thông tin cá nhân (VD: Số hộ chiếu, ngày sinh) chỉ phục vụ cho mục đích bảo hiểm, đây là yêu cầu bắt buộc để đảm bảo an toàn cho bạn trong suốt chuyến tham quan."
                        />
                    </div>
                </div>
                <FloatButton.BackTop visibilityHeight={0} />
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Detail Tour Inner';

export default Inner;
