import {
    CommentOutlined,
    SearchOutlined,
    SendOutlined,
} from '@ant-design/icons';
import { FloatButton, Image, Rate } from 'antd';
import LoveIcon from 'assets/icons/LoveIcon';
import LoveRedIcon from 'assets/icons/LoveRedIcon';
import StarIcon from 'assets/icons/StarIcon';
import DetailTourItem from 'components/DetailTourItem';
import Message from 'components/Message';
import Title from 'components/Title';
import ModalSelectPassenger from 'components/TourItem/components/ModalSelectPassenger';
import dayjs from 'dayjs';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomerId, useToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import userService from 'services/userService';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import CommentList from 'views/DetailTourPage/components/Comment';
import ConfirmToChat from 'views/DetailTourPage/components/ConfirmToChat';
import Rating from 'views/DetailTourPage/components/Rating';
import WriteComment from 'views/DetailTourPage/components/WriteComment';
import WriteReview from 'views/DetailTourPage/components/WriteReview';
import { useCreateContext } from 'views/DetailTourPage/Context';
import './style.scss';

const Inner = memo(
    ({
        tourData,
        orderData,
        socket,
        commentsList,
        reviewsList,
        handleCreateOrder,
    }) => {
        useEffect(() => {
            document.title = 'Chi tiết tour';
        });

        const {
            loveList,
            setLoveList,
            reload,
            setReload,
            openOrderModal,
            setOpenOrderModal,
            adultQuantity,
            setAdultQuantity,
            childQuantity,
            setChildQuantity,
        } = useCreateContext();

        const token = useToken();
        const navigate = useNavigate();
        const { tour_id } = useParams();
        const userId = getCustomerId();

        const [activeTab, setActiveTab] = useState('RATING');
        const [openModalJoinChat, setOpenModalJoinChat] = useState(false);

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
                        tourId,
                        token
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

        if (!tourData || !tourData.description || !tourData.list_image) {
            return null;
        }

        const imageList = JSON.parse(tourData.list_image);
        const descriptionParagraphs =
            tourData?.description.split(/\r\n\r\n|\r\n/);

        const attractionsName = tourData.attractions.map(
            attraction => attraction.name
        );

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
                                    <span>{tourData?.average_rate}</span>
                                </span>
                                <span className="tour-detail__header--rating">
                                    ({tourData?.count_reviewer} lượt đánh giá)
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
                                    <Title title="Tổng quan" />
                                    <p>
                                        <span>Điểm đến:</span>{' '}
                                        {tourData.destination_place}
                                    </p>
                                    <p>
                                        <span>Các địa điểm vui chơi:</span>{' '}
                                        {attractionsName.join(', ')}
                                    </p>
                                </div>
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
                                                <Image
                                                    src={image}
                                                    height={400}
                                                />
                                            </div>
                                        ))}
                                    </Image.PreviewGroup>
                                </div>
                            </div>
                        </div>
                        <div className="tour-detail__feature">
                            <DetailTourItem
                                title={`Từ ${parseInt(
                                    tourData?.price
                                ).toLocaleString()} VNĐ`}
                                icon={<SendOutlined />}
                                buttonTitle="Đặt tour ngay"
                                onClick={() => setOpenOrderModal(true)}
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
                                onClick={() => setOpenModalJoinChat(true)}
                            />
                        </div>
                    </div>
                    <div className="tour-detail__rating">
                        <Title title="Ý kiến từ khách hàng" />
                        <div className="tour-detail__user">
                            <p
                                className={`${
                                    activeTab === 'RATING' ? 'active' : ''
                                }`}
                                onClick={() => setActiveTab('RATING')}
                            >
                                Đánh giá ({tourData?.count_reviewer})
                            </p>
                            <p
                                className={`${
                                    activeTab === 'COMMENT' ? 'active' : ''
                                }`}
                                onClick={() => setActiveTab('COMMENT')}
                            >
                                Bình luận ({commentsList.length})
                            </p>
                        </div>
                        {activeTab === 'RATING' && (
                            <>
                                <div className="tour-detail__rating--header">
                                    <div>
                                        <span className="tour-detail__rating--avg">
                                            <span>
                                                {tourData?.average_rate}/
                                            </span>
                                            <span>5</span>
                                        </span>
                                        <Rate
                                            disabled
                                            allowHalf
                                            defaultValue={parseFloat(
                                                tourData?.average_rate
                                            )}
                                        />
                                        <span className="tour-detail__rating--total">
                                            ({tourData?.count_reviewer} lượt
                                            đánh giá)
                                        </span>
                                    </div>
                                    <span className="tour-detail__rating--see-all">
                                        Xem tất cả đánh giá
                                    </span>
                                </div>
                                <div>
                                    <WriteReview
                                        reload={reload}
                                        setReload={setReload}
                                    />
                                </div>
                                {reviewsList.length > 0 &&
                                    reviewsList[0].comments &&
                                    reviewsList[0].comments.length > 0 &&
                                    reviewsList[0]?.comments.map(review => (
                                        <div
                                            className="tour-detail__rating--content"
                                            key={review.comment_id}
                                        >
                                            <Rating
                                                rate={review.rating}
                                                name={review.user_name}
                                                date={dayjs(
                                                    review.createdAt
                                                ).format(
                                                    DEFAULT_DISPLAY_DATE_FORMAT
                                                )}
                                                content={review.content}
                                            />
                                        </div>
                                    ))}
                            </>
                        )}
                        {activeTab === 'COMMENT' && (
                            <div className="tour-detail__rating--content">
                                <WriteComment
                                    reload={reload}
                                    setReload={setReload}
                                />
                                {commentsList &&
                                    commentsList.length > 0 &&
                                    commentsList
                                        .filter(
                                            cmt =>
                                                cmt.parent_comment_id === null
                                        )
                                        .map(cmt => (
                                            <CommentList
                                                key={cmt.comment_id}
                                                name={cmt.user_name}
                                                date={dayjs(
                                                    cmt.createdAt
                                                ).format(
                                                    DEFAULT_DISPLAY_DATE_FORMAT
                                                )}
                                                content={cmt.content}
                                                parentId={cmt.comment_id}
                                                reload={reload}
                                                setReload={setReload}
                                            />
                                        ))}
                            </div>
                        )}
                    </div>
                    <FloatButton.BackTop visibilityHeight={0} />
                    <ModalSelectPassenger
                        tourId={tour_id}
                        name="order-passenger"
                        adultQuantity={adultQuantity}
                        childQuantity={childQuantity}
                        setAdultQuantity={setAdultQuantity}
                        setChildQuantity={setChildQuantity}
                        openModal={openOrderModal}
                        setOpenModal={setOpenOrderModal}
                        handleFinish={handleCreateOrder}
                    />
                    <ConfirmToChat
                        socket={socket}
                        openModalJoinChat={openModalJoinChat}
                        setOpenModalJoinChat={setOpenModalJoinChat}
                        orderData={orderData}
                    />
                </div>
            </UserHomePageLayout>
        );
    }
);

Inner.displayName = 'Detail Tour Inner';

export default Inner;
