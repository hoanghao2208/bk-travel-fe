import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCustomerId, getToken } from 'reducers/token/function';
import messageService from 'services/messageService';
import io from 'socket.io-client';
import Inner from 'views/Message/Inner';

let socket;

const Wrapper = memo(() => {
    useEffect(() => {
        document.title = 'Tin nhắn';
    });

    const [searchParams] = useSearchParams();

    const token = getToken();
    const userId = getCustomerId();

    const [allGroups, setAllGroups] = useState([]);
    const [allMessage, setAllMessage] = useState([]);
    const [groupInfo, setGroupInfo] = useState([]);
    const [arrivalGrps, setArrivalGrps] = useState([]);

    const [arrivalMessage, setArrivalMessage] = useState(null);

    const [activeGrp, setActiveGrp] = useState(
        Object.fromEntries(searchParams.entries()).selectedGrp || null
    );

    useEffect(() => {
        socket = io('http://localhost:8080', {
            query: { access_token: token },
        });

        socket.on('connect', () => {
            console.log('Connected to the server');
        });

        socket.emit('online', userId);

        socket.on('room message', msg => {
            console.log('Received message:', msg);
        });

        socket.on('groupData', groups => {
            console.log('Received group data:', groups);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        });

        return () => {
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getAllMessages = useCallback(async () => {
        try {
            const response = await messageService.getAllMessages(
                activeGrp,
                token
            );
            if (response?.status === 200) {
                setAllMessage(response.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [activeGrp, token]);

    const getActiveGroupInfo = useCallback(async () => {
        try {
            if (activeGrp) {
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
        arrivalGrps && setAllGroups([...arrivalGrps]);
    }, [arrivalGrps]);

    useEffect(() => {
        getAllMessages();
    }, [getAllMessages]);

    useEffect(() => {
        arrivalMessage && setAllMessage(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    // useEffect(() => {
    //     if (contentRef.current) {
    //         contentRef.current.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'end',
    //         });
    //     }
    // }, [allMessage, reload]);

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
