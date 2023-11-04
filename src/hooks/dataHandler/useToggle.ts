import { useCallback, useState } from 'react';

const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue);
    const toggle = useCallback(
        (nV?: boolean) => setValue(v => (typeof nV === 'boolean' ? nV : !v)),
        []
    );
    return [value, toggle] as const;
};

export default useToggle;
