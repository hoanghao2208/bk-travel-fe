import {
    CommentOutlined,
    SearchOutlined,
    SendOutlined,
} from '@ant-design/icons';
import { Image, Rate } from 'antd';
import LoveIcon from 'assets/icons/LoveIcon';
import StarIcon from 'assets/icons/StarIcon';
import Comment from 'components/Comment';
import DetailTourItem from 'components/DetailTourItem';
import Title from 'components/Title';
import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const Inner = memo(() => {
    useEffect(() => {
        document.title = 'Chi tiết tour';
    });
    const navigate = useNavigate();
    return (
        <UserHomePageLayout>
            <div className="tour-detail">
                <div className="tour-detail__header">
                    <h3 className="tour-detail__header--title">
                        Đà Nẵng – KDL Bà Nà – Sơn Trà – Hội An – La Vang - Động
                        Phong Nha – Làng hương Thủy Xuân - Huế
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
                        <p className="tour-detail__header--like">
                            <LoveIcon />
                            <span>Yêu thích</span>
                        </p>
                    </div>
                </div>
                <div className="tour-detail__wrapper">
                    <div className="tour-detail__content">
                        <div className="tour-detail__book-tour">
                            <div className="tour-detail__book-tour--image">
                                <Image src="/images/slide5.jpg" height={500} />
                            </div>
                        </div>
                        <div className="tour-detail__infor">
                            <div className="tour-detail__infor--details">
                                <Title title="Chi tiết tour" />
                                <p>
                                    Một chuyến đi sẽ vui và thuận tiện biết mấy
                                    khi không phải lo lắng về phương tiện di
                                    chuyển trong chuyến đi của mình đúng không
                                    nào? Dịch vụ đưa đón chung và đưa đón riêng
                                    đến Safari World - cách Bangkok 45 phút - sẽ
                                    đưa bạn đến với niềm vui và các cuộc phiêu
                                    lưu! Dịch vụ đưa đón thoải mái này sẽ không
                                    chỉ đưa bạn đến và đi từ công viên mà thậm
                                    chí còn đưa bạn qua công viên Safari Park để
                                    bạn có thể đến gần các loài động vật. Có
                                    hàng trăm loại động vật trong công viên,
                                    không đơn thuần là hươu cao cổ, ngựa vằn, hổ
                                    và gấu mà còn có các loài chim và bò sát và
                                    những loài khác. Với phong cách Châu Phi
                                    hoang dã, công viên sẽ mang lại cho bạn cảm
                                    giác đang ở Serengeti ngắm nhìn những sinh
                                    vật tuyệt vời. Bạn sẽ được xem các chương
                                    trình ngoạn mục tại công viên biển, bao gồm
                                    chương trình Cowboy Stunt, chương trình biểu
                                    diễn cá heo và hơn thế nữa! Đừng lo lắng về
                                    việc quay trở lại Bangkok; xe đưa đón của
                                    bạn sẽ chờ đón bạn và đưa bạn trở về một
                                    cách an toàn và thuận tiện.
                                </p>
                                <div className="tour-detail__infor--img">
                                    <Image
                                        src="/images/slide2.jpg"
                                        height={400}
                                    />
                                    <p className="tour-detail__infor--img-desc">
                                        Khám phá Dinh Độc Lập
                                    </p>
                                </div>
                                <p>
                                    Một chuyến đi sẽ vui và thuận tiện biết mấy
                                    khi không phải lo lắng về phương tiện di
                                    chuyển trong chuyến đi của mình đúng không
                                    nào? Dịch vụ đưa đón chung và đưa đón riêng
                                    đến Safari World - cách Bangkok 45 phút - sẽ
                                    đưa bạn đến với niềm vui và các cuộc phiêu
                                    lưu! Dịch vụ đưa đón thoải mái này sẽ không
                                    chỉ đưa bạn đến và đi từ công viên mà thậm
                                    chí còn đưa bạn qua công viên Safari Park để
                                    bạn có thể đến gần các loài động vật. Có
                                    hàng trăm loại động vật trong công viên,
                                    không đơn thuần là hươu cao cổ, ngựa vằn, hổ
                                    và gấu mà còn có các loài chim và bò sát và
                                    những loài khác. Với phong cách Châu Phi
                                    hoang dã, công viên sẽ mang lại cho bạn cảm
                                    giác đang ở Serengeti ngắm nhìn những sinh
                                    vật tuyệt vời. Bạn sẽ được xem các chương
                                    trình ngoạn mục tại công viên biển, bao gồm
                                    chương trình Cowboy Stunt, chương trình biểu
                                    diễn cá heo và hơn thế nữa! Đừng lo lắng về
                                    việc quay trở lại Bangkok; xe đưa đón của
                                    bạn sẽ chờ đón bạn và đưa bạn trở về một
                                    cách an toàn và thuận tiện.
                                </p>
                                <div className="tour-detail__infor--img">
                                    <Image
                                        src="/images/slide6.jpg"
                                        height={400}
                                    />
                                    <p className="tour-detail__infor--img-desc">
                                        Landmark 81 - Tòa nhà cao nhất Việt Nam
                                    </p>
                                </div>
                            </div>
                            <div className="tour-detail__infor--details">
                                <Title title="Những điều cần lưu ý" />
                                <p>
                                    Khi đến nơi, bạn cần điền thông tin vào mẫu
                                    đơn bảo hiểm. Lưu ý, việc cung cấp thông tin
                                    cá nhân (VD: Số hộ chiếu, ngày sinh) chỉ
                                    phục vụ cho mục đích bảo hiểm, đây là yêu
                                    cầu bắt buộc để đảm bảo an toàn cho bạn
                                    trong suốt chuyến tham quan. Nếu bạn không
                                    cung cấp thông tin được yêu cầu, bạn phải ký
                                    giấy miễn trừ trách nhiệm tại chỗ để tiếp
                                    tục tham gia chuyến tham quan
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="tour-detail__feature">
                        <DetailTourItem
                            title="Từ đ 10.500.802"
                            icon={<SendOutlined />}
                            buttonTitle="Đặt tour ngay"
                        />
                        <DetailTourItem
                            title="Lịch trình tour"
                            intro="Khám phá lịch trình tour ngay!"
                            icon={<SearchOutlined />}
                            buttonTitle="Xem lịch trình tour"
                            onClick={() => navigate('/tour/schedule/detail/oo')}
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
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Detail Tour Inner';

export default Inner;
