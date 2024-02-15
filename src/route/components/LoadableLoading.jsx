import { Spin } from 'antd';
import { memo, useEffect } from 'react';
import { setError } from 'reducers/error/function';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoadableLoading = memo(({ error, retry, timedOut, pastDelay }) => {
    useEffect(() => {
        if (error) {
            console.error(error);
            setError(500, String(error));
        }
    }, [error]);

    useEffect(() => {
        if (timedOut) {
            setError(408, 'Request timed out');
        }
    }, [timedOut]);

    return (
        <div
            className="loading-container"
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Spin size="large" tip="Loading..." />
        </div>
    );
});
LoadableLoading.displayName = 'LoadableLoading';

export default LoadableLoading;
