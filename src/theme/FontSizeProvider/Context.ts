import { createContext } from 'react';

const Context = createContext({
    handleFontZoom: (_zoom: string | number) => {},
    fontZoom: 1,
});

export default Context;
