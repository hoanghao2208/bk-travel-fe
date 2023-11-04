import { memo, useEffect } from 'react';
import { setError } from 'reducers/error/function';
import { setToken } from 'reducers/token/function';

const E401 = memo(() => {
    useEffect(() => {
        setToken(null);
        setError(null);
    }, []);
    return null;
});
E401.displayName = 'E401';

export default E401;
