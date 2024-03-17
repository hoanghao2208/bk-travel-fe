import { Button, Modal } from 'antd';
import Message from 'components/Message';
import AdminLayout from 'layouts/AdminLayout';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routeConstants from 'route/routeConstant';
import tourService from 'services/tourService';
import WaitingItem from 'views/AdminManageTours/components/WaitingItem';
import './style.scss';

const Inner = memo(
    ({ waitingTours, deletedTours, onlineTours, setRefresh }) => {
        useEffect(() => {
            document.title = 'Quản lý tours';
        });
        const navigate = useNavigate();

        const [activeTab, setActiveTab] = useState('ONLINE');
        const [openDeleteModal, setOpenDeleteModal] = useState(false);
        const [tourName, setTourName] = useState('');
        const [selectedTourId, setSelectedTourId] = useState(null);

        const handleChangeTab = currentTab => {
            setActiveTab(currentTab);
        };

        const handleGetTourName = async tour_id => {
            try {
                const response = await tourService.getOneTour(tour_id);
                if (response?.status === 200) {
                    setTourName(response.data.data.name);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const hanldeDeleteTour = async tour_id => {
            try {
                const response = await tourService.deleteTour(tour_id);
                if (response?.status === 200) {
                    Message.sendSuccess('Xóa tour du lịch thành công');
                    setOpenDeleteModal(false);
                    setRefresh(prev => !prev);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const handleRecoverTour = async tour_id => {
            try {
                const response = await tourService.recoverTour(tour_id);
                if (response?.status === 200) {
                    Message.sendSuccess('Khôi phục tour thành công');
                    setRefresh(prev => !prev);
                }
            } catch (error) {
                console.error(error);
            }
        };

        return (
            <AdminLayout>
                <div className="manage-tours">
                    <div className="manage-tours__header">
                        <h2 className="manage-tours__header--title">
                            BK - Travel
                        </h2>
                        <div className="manage-tours__header--btn">
                            <Button
                                onClick={() =>
                                    navigate(routeConstants.ADMIN_ADD_NEW_TOUR)
                                }
                            >
                                Thêm tour mới
                            </Button>
                        </div>
                    </div>
                    <div className="manage-tours__content">
                        <div className="tab-selector">
                            <div
                                className={`tab-selector__item ${
                                    activeTab === 'ONLINE' ? 'active' : ''
                                }`}
                                onClick={() => handleChangeTab('ONLINE')}
                            >
                                Tour đang hoạt động
                            </div>
                            <div
                                className={`tab-selector__item ${
                                    activeTab === 'WAITING' ? 'active' : ''
                                }`}
                                onClick={() => handleChangeTab('WAITING')}
                            >
                                Tour đang chờ
                            </div>
                            <div
                                className={`tab-selector__item ${
                                    activeTab === 'DELETED' ? 'active' : ''
                                }`}
                                onClick={() => handleChangeTab('DELETED')}
                            >
                                Tour đã xóa
                            </div>
                        </div>

                        {activeTab === 'WAITING' &&
                            waitingTours.length > 0 &&
                            waitingTours.map(item => (
                                <WaitingItem
                                    key={item.tour_id}
                                    status="WAITING"
                                    tour_id={item.tour_id}
                                    imgURL={item.cover_image}
                                    tourName={item.name}
                                    date={item.departure_date}
                                    time={item.time}
                                    departure_place={item.departure_place}
                                    setOpenDeleteModal={setOpenDeleteModal}
                                    setSelectedTourId={setSelectedTourId}
                                />
                            ))}

                        {activeTab === 'ONLINE' &&
                            onlineTours.length > 0 &&
                            onlineTours.map(item => (
                                <WaitingItem
                                    key={item.tour_id}
                                    status="ONLINE"
                                    tour_id={item.tour_id}
                                    imgURL={item.cover_image}
                                    tourName={item.name}
                                    date={item.departure_date}
                                    time={item.time}
                                    departure_place={item.departure_place}
                                    setOpenDeleteModal={setOpenDeleteModal}
                                    setSelectedTourId={setSelectedTourId}
                                />
                            ))}

                        {activeTab === 'DELETED' &&
                            deletedTours.length > 0 &&
                            deletedTours.map(item => (
                                <WaitingItem
                                    key={item.tour_id}
                                    status="DELETED"
                                    tour_id={item.tour_id}
                                    imgURL={item.cover_image}
                                    tourName={item.name}
                                    date={item.departure_date}
                                    time={item.time}
                                    departure_place={item.departure_place}
                                    handleRecoverTour={handleRecoverTour}
                                />
                            ))}

                        {selectedTourId && (
                            <Modal
                                title="Xác nhận xóa tour du lịch?"
                                open={openDeleteModal}
                                onCancel={() => setOpenDeleteModal(false)}
                                onOk={handleGetTourName(selectedTourId)}
                                footer={[
                                    <Button
                                        key="cancel"
                                        onClick={() =>
                                            setOpenDeleteModal(false)
                                        }
                                    >
                                        Hủy
                                    </Button>,
                                    <Button
                                        key="submit"
                                        danger
                                        type="primary"
                                        // loading={loading}
                                        onClick={() =>
                                            hanldeDeleteTour(selectedTourId)
                                        }
                                    >
                                        Xác nhận
                                    </Button>,
                                ]}
                            >
                                <p
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Xác nhận xóa {tourName}
                                </p>
                            </Modal>
                        )}
                    </div>
                </div>
            </AdminLayout>
        );
    }
);

Inner.displayName = 'Admin Manage Tours Inner';

export default Inner;
