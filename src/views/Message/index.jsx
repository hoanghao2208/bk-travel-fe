import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import messageService from 'services/messageService';
import { io } from 'socket.io-client';
import { BASE_URL } from 'utils/constants';
import Inner from 'views/Message/Inner';

let socket;

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Tin nhắn';
    });

    const token = getToken();
    const userId = getCustomerId();

    const [allGroups, setAllGroups] = useState([]);

    useEffect(() => {
        socket = io(BASE_URL, {
            query: { access_token: token },
        });

        socket.emit('online', userId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllGroupsOfUser = useCallback(async () => {
        try {
            const response = await messageService.getAllGroupsByUserId(
                userId,
                token
            );
            if (response?.status === 200) {
                setAllGroups(response.data.data[0].groups);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token, userId]);

    useEffect(() => {
        getAllGroupsOfUser();
    }, [getAllGroupsOfUser]);

    return <Inner allGroups={allGroups} socket={socket} />;
});

Wrapper.displayName = 'Message';

const Message = Wrapper;

export default Message;
