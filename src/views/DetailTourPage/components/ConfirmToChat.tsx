import { Button, Modal } from 'antd';
import Message from 'components/Message';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomerId } from 'reducers/token/function';
import routeConstants from 'route/routeConstant';
import messageService from 'services/messageService';

interface ConfirmToChatProps {
    openModalJoinChat: boolean;
    setOpenModalJoinChat: (isOpen: boolean) => void;
    orderData: any;
    socket: any;
}

const ConfirmToChat: FC<ConfirmToChatProps> = memo(
    ({ openModalJoinChat, setOpenModalJoinChat, orderData, socket }) => {
        const { tour_id } = useParams();
        const userId = getCustomerId();
        const navigate = useNavigate();

        const [curOrder, setCurOrder] = useState(0);

        const isTourIdExists = useMemo(() => {
            if (tour_id) {
                for (let index = 0; index < orderData.length; index++) {
                    const item = orderData[index];
                    if (
                        item !== undefined &&
                        item.tour_id.includes(parseInt(tour_id))
                    ) {
                        setCurOrder(index);
                        return true;
                    }
                }
            }
            return false;
        }, [orderData, tour_id]);

        const handleJoinGroup = useCallback(async () => {
            try {
                if (isTourIdExists && tour_id) {
                    const body = {
                        user_id: userId,
                        tour_id: parseInt(tour_id),
                        order_id: curOrder,
                    };
                    const response = await messageService.joinGroup(
                        parseInt(tour_id),
                        body
                    );

                    if (response?.status === 200) {
                        Message.sendSuccess('Tham gia nhóm hỗ trợ thành công');
                        socket.emit('join', {
                            room: parseInt(tour_id),
                        });
                        setOpenModalJoinChat(false);
                        navigate(routeConstants.MESSAGE);
                    }
                } else {
                    Message.sendError(
                        'Bạn chưa đặt tour này nên không thể tham gia vào nhóm hỗ trợ'
                    );
                }
            } catch (error) {
                console.error(error);
                Message.sendError('Bạn đã tham gia group này rồi');
            }
        }, [
            curOrder,
            isTourIdExists,
            navigate,
            setOpenModalJoinChat,
            socket,
            tour_id,
            userId,
        ]);

        return (
            <Modal
                title="Tham gia vào nhóm hỗ trợ"
                open={openModalJoinChat}
                onCancel={() => setOpenModalJoinChat(false)}
                footer={[
                    <div key="join-chat-footer">
                        <Button
                            key="back"
                            onClick={() => setOpenModalJoinChat(false)}
                        >
                            Hủy
                        </Button>
                        ,
                        <Button
                            key="submit"
                            type="primary"
                            htmlType="submit"
                            onClick={handleJoinGroup}
                        >
                            Xác nhận
                        </Button>
                        ,
                    </div>,
                ]}
            >
                <p>Bạn có muốn tham gia vào nhóm hỗ trợ của tour này không?</p>
            </Modal>
        );
    }
);

ConfirmToChat.displayName = 'Confirm To Chat';

export default ConfirmToChat;
