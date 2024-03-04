import { FC, memo } from 'react';
import { Button } from 'antd';
import {
    CloudSyncOutlined,
    EditOutlined,
    DeleteOutlined,
    UndoOutlined,
} from '@ant-design/icons';
import './styles.scss';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

interface WaitingItemProps {
    status: string;
    tour_id: number;
    imgURL: string;
    tourName: string;
    date: string;
    time: string;
    departure_place: string;
    setOpenDeleteModal?: (isOpen: boolean) => void;
    setSelectedTourId?: (tour_id: number) => void;
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
        departure_place,
        setOpenDeleteModal,
        setSelectedTourId,
        handleRecoverTour,
    }) => {
        const formattedDate = dayjs(date).format('DD/MM/YYYY');
        const navigate = useNavigate();

        const handleOpenModal = () => {
            setOpenDeleteModal && setOpenDeleteModal(true);
            setSelectedTourId && setSelectedTourId(tour_id);
        };

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
                            Khởi hành {departure_place}
                        </span>
                    </div>
                </div>

                {status === 'WAITING' && setOpenDeleteModal && (
                    <div className="waiting-item__btn">
                        <Button
                            type="primary"
                            icon={<CloudSyncOutlined />}
                            onClick={handleNavigateSchedule}
                        >
                            Lên lịch trình
                        </Button>
                        <Button
                            icon={<EditOutlined />}
                            onClick={hanldeNavigateEdit}
                        >
                            Chỉnh sửa
                        </Button>
                        <Button
                            key="submit"
                            danger
                            type="primary"
                            icon={<DeleteOutlined />}
                            onClick={handleOpenModal}
                        >
                            Xóa
                        </Button>
                        ,
                    </div>
                )}

                {status === 'DELETED' && handleRecoverTour && (
                    <div className="waiting-item__btn">
                        <Button
                            type="primary"
                            icon={<UndoOutlined />}
                            onClick={() => handleRecoverTour(tour_id)}
                        >
                            Khôi phục
                        </Button>
                    </div>
                )}
            </div>
        );
    }
);

WaitingItem.displayName = 'Waiting Item';

export default WaitingItem;
