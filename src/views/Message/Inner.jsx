import UserHomePageLayout from 'layouts/UserHomePageLayout';
import { memo, useEffect, useState } from 'react';
import Group from 'views/Message/components/Group';
import './styles.scss';
import { getCustomerId, getToken } from 'reducers/token/function';
import io from 'socket.io-client';

let socket;

const Inner = memo(() => {
    const [groups, setGroups] = useState([]);
    const [arrivalGroups, setArrivalGroups] = useState([]);

    let baseUrl = 'http://localhost:3000';

    useEffect(() => {
        const token = getToken();
        const userId = getCustomerId();

        socket = io(baseUrl, {
            query: { access_token: token },
        });

        socket.on('connect', () => {
            console.log('socket', socket);
        });

        socket.emit('online', userId);

        socket.on('grpData', grpData => {
            setArrivalGroups(grpData);
        });

        socket.on('error', error => {
            console.error('Socket error:', error);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log('data', arrivalGroups);
    }, [arrivalGroups]);

    console.log('socket', socket);

    return (
        <UserHomePageLayout>
            <div className="message">
                <div className="message-group">
                    <Group
                        name="Dương Hoàng Hảo"
                        desc="Hoàng Hảo"
                    />
                </div>
            </div>
        </UserHomePageLayout>
    );
});

Inner.displayName = 'Message Inner';

export default Inner;
