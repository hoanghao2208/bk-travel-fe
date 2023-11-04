import { MutableRefObject, useEffect, useRef } from 'react';

const useDataRef = <T extends any>(
    data: T | undefined
): MutableRefObject<T | undefined> => {
    const ref = useRef(data);

    useEffect(() => {
        ref.current = data;
    }, [data]);

    return ref;
};

export default useDataRef;
