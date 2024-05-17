import {
    CloudSyncOutlined,
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    UndoOutlined,
} from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import Message from 'components/Message';
import dayjs from 'dayjs';
import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import tourService from 'services/tourService';
import './styles.scss';

interface WaitingItemProps {
    status: string;
    tour_id: number;
    imgURL: string;
    tourName: string;
    date: string;
    time: string;
    departure_place: string;
    refresh?: boolean;
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
        refresh,
        departure_place,
        setOpenDeleteModal,
        setRefresh,
        setSelectedTourId,
        handleRecoverTour,
    }) => {
        const formattedDate = dayjs(date).format('DD/MM/YYYY');
        const navigate = useNavigate();

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

        const handleNavigateSchedule = () => {
            navigate(`/admin/schedule/${tour_id}`);
        };

        return (
            <div className="waiting-item">
                <div className="waiting-item__img">
                    <img src={imgURL} alt="waiting-img" />
                </div>
                <div className="waiting-item__detail">
                    <h3 className="waiting-item__detail--title">{tourName}</h3>
                    <div className="waiting-item__detail--inf1">
                        <span className="waiting-item__detail--inf1-col1">
                            Ngày {formattedDate}
                        </span>
                        <span className="waiting-item__detail--inf1-col2">
                            {time}
                        </span>
                        <span className="waiting-item__detail--inf1-col3">
                            Khởi hành từ {departure_place}
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
            </div>
        );
    }
);

WaitingItem.displayName = 'Waiting Item';

export default WaitingItem;
