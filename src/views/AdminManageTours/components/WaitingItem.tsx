import {
    CloudSyncOutlined,
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    UndoOutlined,
} from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import Message from 'components/Message';
import dayjs from 'dayjs';
import { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import messageService from 'services/messageService';
import tourService from 'services/tourService';
import { DEFAULT_DISPLAY_DATE_FORMAT } from 'utils/constants';
import './styles.scss';

interface WaitingItemProps {
    status: string;
    tour_id: number;
    imgURL: string;
    tourName: string;
    date: string;
    time: string;
    departure_place: string;
    space?: number;
    expired_date?: string;
    refresh?: boolean;
    departure_time?: string;
    setOpenDeleteModal?: (isOpen: boolean) => void;
    setSelectedTourId?: (tour_id: number) => void;
    setRefresh?: (value: boolean) => void;
    handleRecoverTour?: (tour_id: number) => void;
}

const WaitingItem: FC<WaitingItemProps> = memo(
    ({
        status,
        tour_id,
        imgURL,
        tourName,
        date,
        time,
        space,
        expired_date,
        departure_time,
        refresh,
        departure_place,
        setOpenDeleteModal,
        setRefresh,
        setSelectedTourId,
        handleRecoverTour,
    }) => {
        const token = getToken();
        const formattedDate = dayjs(date).format('DD/MM/YYYY');
        const navigate = useNavigate();
        const [modalNavigate, setModalNavigate] = useState(false);

        const handleOpenModal = () => {
            setOpenDeleteModal && setOpenDeleteModal(true);
            setSelectedTourId && setSelectedTourId(tour_id);
        };

        const handleDuplicateTour = useCallback(async () => {
            try {
                const response = await tourService.adminDuplicateTour(tour_id);
                if (response?.status === 201 && setRefresh) {
                    setRefresh(!refresh);
                    Message.sendSuccess('Sao chép tour thành công');
                }
            } catch (error) {
                console.error(error);
            }
        }, [refresh, setRefresh, tour_id]);

        const hanldeNavigateEdit = () => {
            navigate(`/admin/edit-information-tour/${tour_id}`);
        };

        const handleNavigateSchedule = useCallback(async () => {
            try {
                const response = await tourService.getTourSchedule(tour_id);
                if (response?.status === 200) {
                    setModalNavigate(true);
                }
            } catch (error: any) {
                if (error?.response.status === 404) {
                    navigate(`/admin/schedule/${tour_id}`);
                }
            }
        }, [navigate, tour_id]);

        const handlePublicTour = useCallback(async () => {
            try {
                const body = {
                    tour_id,
                    name: `Nhóm hỗ trợ ${tourName} - Khởi hành ngày ${dayjs(
                        date
                    ).format('DD/MM/YYYY')} - ${time}`,
                };

                const response1 = await tourService.publicTour(tour_id, token);
                const response2 = await messageService.createGroup(token, body);

                if (
                    response1?.status === 200 &&
                    response2?.status === 201 &&
                    setRefresh
                ) {
                    Message.sendSuccess('Khởi tạo tour thành công');
                    setModalNavigate(false);
                    setRefresh(!refresh);
                    navigate(routeConstants.ADMIN_MANAGE_TOURS);
                }
            } catch (error) {
                console.error(error);
            }
        }, [
            date,
            navigate,
            refresh,
            setRefresh,
            time,
            token,
            tourName,
            tour_id,
        ]);

        return (
            <div className="waiting-item">
                <div className="waiting-item__img">
                    <img src={imgURL} alt="waiting-img" />
                </div>
                <div className="waiting-item__detail">
                    <h3 className="waiting-item__detail--title">{tourName}</h3>
                    <div className="waiting-item__detail--inf1">
                        <span className="waiting-item__detail--inf1-col1">
                            Ngày khởi hành {formattedDate}
                        </span>
                        <span className="waiting-item__detail--inf1-col2">
                            Thời gian {departure_time}
                        </span>
                        <span className="waiting-item__detail--inf1-col3">
                            Từ {departure_place}
                        </span>
                    </div>
                    <div className="waiting-item__detail--inf1">
                        <span className="waiting-item__detail--inf1-col1">
                            Hạn đặt chổ{' '}
                            {dayjs(expired_date).format(
                                DEFAULT_DISPLAY_DATE_FORMAT
                            )}
                        </span>
                        <span className="waiting-item__detail--inf1-col2">
                            {time}
                        </span>
                        <span className="waiting-item__detail--inf1-col3">
                            {space} chổ trống
                        </span>
                    </div>
                </div>
                {status === 'ONLINE' && (
                    <div className="waiting-item__btn">
                        <Tooltip placement="top" title="Chỉnh sửa">
                            <Button
                                icon={<EditOutlined />}
                                type="text"
                                shape="circle"
                                onClick={hanldeNavigateEdit}
                            />
                        </Tooltip>
                        <Tooltip placement="top" title="Sao chép tour">
                            <Button
                                type="text"
                                shape="circle"
                                icon={<CopyOutlined />}
                                onClick={handleDuplicateTour}
                            />
                        </Tooltip>
                    </div>
                )}

                {status === 'WAITING' && setOpenDeleteModal && (
                    <div className="waiting-item__btn">
                        <div className="waiting-item__btn--row">
                            <Tooltip placement="top" title="Lên lịch trình">
                                <Button
                                    type="link"
                                    shape="circle"
                                    icon={<CloudSyncOutlined />}
                                    onClick={handleNavigateSchedule}
                                />
                            </Tooltip>
                            <Tooltip placement="top" title="Chỉnh sửa">
                                <Button
                                    icon={<EditOutlined />}
                                    type="text"
                                    shape="circle"
                                    onClick={hanldeNavigateEdit}
                                />
                            </Tooltip>
                        </div>
                        <div className="waiting-item__btn--row">
                            <Tooltip placement="top" title="Sao chép tour">
                                <Button
                                    type="text"
                                    shape="circle"
                                    icon={<CopyOutlined />}
                                    onClick={handleDuplicateTour}
                                />
                            </Tooltip>
                            <Tooltip placement="top" title="Xóa">
                                <Button
                                    danger
                                    key="submit"
                                    shape="circle"
                                    type="text"
                                    icon={<DeleteOutlined />}
                                    onClick={handleOpenModal}
                                />
                            </Tooltip>
                        </div>
                    </div>
                )}

                {status === 'DELETED' && handleRecoverTour && (
                    <div className="waiting-item__btn">
                        <Tooltip placement="top" title="Khôi phục">
                            <Button
                                type="primary"
                                icon={<UndoOutlined />}
                                onClick={() => handleRecoverTour(tour_id)}
                            />
                        </Tooltip>
                    </div>
                )}

                <Modal
                    open={modalNavigate}
                    title="Thông báo"
                    onCancel={() => setModalNavigate(false)}
                    className="waiting-item__navigate-modal"
                    footer={[
                        <Button key="back" onClick={handlePublicTour}>
                            Giữ nguyên lịch trình
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={() =>
                                navigate(`/admin/update/schedule/${tour_id}`)
                            }
                        >
                            Cập nhật lịch trình
                        </Button>,
                    ]}
                >
                    <p>
                        Tour du lịch này đã được lên lịch trình từ trước, bạn có
                        muốn cập nhật lại lịch trình hay không?
                    </p>
                </Modal>
            </div>
        );
    }
);

WaitingItem.displayName = 'Waiting Item';

export default WaitingItem;
