import { memo, useCallback, useEffect, useState } from 'react';
import { getCustomerId, getToken } from 'reducers/token/function';
import messageService from 'services/messageService';
import tourGuideService from 'services/tourGuideService';
import io from 'socket.io-client';
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
    const [allMessage, setAllMessage] = useState([]);
    const [groupInfo, setGroupInfo] = useState([]);
    const [allTourGuideId, setAllTourGuideId] = useState([]);

    const [activeGrp, setActiveGrp] = useState(null);

    useEffect(() => {
        socket = io(BASE_URL, {
            query: { access_token: token },
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });

        socket.on('connect', () => {
            // eslint-disable-next-line no-console
            console.log('Connected to server');
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

    const getAllTourGuide = useCallback(async () => {
        try {
            const response = await tourGuideService.getAllTourGuides(token);
            if (response?.status === 200) {
                const tourGuideIds = response.data.data.map(
                    item => item.user_id
                );
                setAllTourGuideId(tourGuideIds);
            }
        } catch (error) {
            console.error(error);
        }
    }, [token]);

    useEffect(() => {
        getAllGroupsOfUser();
    }, [getAllGroupsOfUser]);

    useEffect(() => {
        getAllMessages();
    }, [getAllMessages]);

    useEffect(() => {
        getActiveGroupInfo();
    }, [getActiveGroupInfo]);

    useEffect(() => {
        getAllTourGuide();
    }, [getAllTourGuide]);

    return (
        <Inner
            allGroups={allGroups}
            socket={socket}
            activeGrp={activeGrp}
            setActiveGrp={setActiveGrp}
            groupInfo={groupInfo}
            allMessage={allMessage}
            allTourGuideId={allTourGuideId}
        />
    );
});

Wrapper.displayName = 'Message';

const Message = Wrapper;

export default Message;
