import FontSizeProvider from 'theme/FontSizeProvider/Provider';

import Context from 'theme/FontSizeProvider/Context';
import { useContext } from 'react';

export const useFontSize = () => useContext(Context);

export default FontSizeProvider;
