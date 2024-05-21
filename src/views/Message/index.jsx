import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import messageService from 'services/messageService';
import io from 'socket.io-client';
import Inner from 'views/Message/Inner';

let socket;

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Tin nhắn';
    });

    const token = getToken();
    const userId = getCustomerId();

    const [allGroups, setAllGroups] = useState([]);
    const [allMessage, setAllMessage] = useState([]);
    const [groupInfo, setGroupInfo] = useState([]);
    // const [arrivalGrps, setArrivalGrps] = useState([]);

    const [activeGrp, setActiveGrp] = useState(null);

    useEffect(() => {
        socket = io('http://localhost:8080', {
            query: { access_token: token },
        });

        socket.on('connect', () => {
            // eslint-disable-next-line no-console
            console.log('Connected to the server');
        });

        socket.emit('online', userId);

        socket.on('room message', (msg, user_id) => {
            const newMsg = {
                content: msg,
                group_id: parseInt(activeGrp),
                message_id: allMessage.length + 1,
                user_id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setAllMessage(prev => [...prev, newMsg]);
        });

        socket.on('groupData', groups => {
            // eslint-disable-next-line no-console
            console.log('Received group data:', groups);
        });

        socket.on('disconnect', () => {
            // eslint-disable-next-line no-console
            console.log('Disconnected from the server');
        });

        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllMessages = useCallback(async () => {
        try {
            if (activeGrp !== null) {
                const response = await messageService.getAllMessages(
                    activeGrp,
                    token
                );
                if (response?.status === 200) {
                    setAllMessage(response.data.data);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [activeGrp, token]);

    const getActiveGroupInfo = useCallback(async () => {
        try {
            if (activeGrp !== null) {
                const response = await messageService.getGroupById(
                    activeGrp,
                    token
                );
                if (response?.status === 200) {
                    setGroupInfo(response.data.data);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, [activeGrp, token]);

    useEffect(() => {
        getActiveGroupInfo();
    }, [getActiveGroupInfo]);

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

    useEffect(() => {
        getAllMessages();
    }, [getAllMessages]);

    return (
        <Inner
            allGroups={allGroups}
            socket={socket}
            activeGrp={activeGrp}
            setActiveGrp={setActiveGrp}
            groupInfo={groupInfo}
            allMessage={allMessage}
        />
    );
});

Wrapper.displayName = 'Message';

const Message = Wrapper;

export default Message;
