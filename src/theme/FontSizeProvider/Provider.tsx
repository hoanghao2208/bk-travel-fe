import _forEach from 'lodash/forEach';
import _round from 'lodash/round';
import _toNumber from 'lodash/toNumber';
import {
    FC,
    memo,
    ReactComponentElement,
    useCallback,
    useEffect,
    useState,
} from 'react';
import fontSizeConfig from 'scss/utils/_font-size.module.scss';
import Context from 'theme/FontSizeProvider/Context';

interface IFontSizeProviderProps {
    children: ReactComponentElement<any>;
    defaultFontZoom?: number | string;
}

const Provider: FC<IFontSizeProviderProps> = memo(
    ({ children, defaultFontZoom }) => {
        const [fontZoom, setFontZoom] = useState(1 as number);

        const handleFontZoom = useCallback((zoom: number | string) => {
            if (typeof zoom === 'string') {
                let zoomNumeric = 1;
                if (zoom.includes('%')) {
                    zoomNumeric = _toNumber(zoom.replace('%', ''));
                } else {
                    zoomNumeric = _toNumber(zoom);
                }
                if (zoomNumeric) {
                    setFontZoom(zoomNumeric / 100);
                }
            } else if (typeof zoom === 'number') {
                setFontZoom(zoom);
            }
        }, []);

        useEffect(() => {
            if (defaultFontZoom) {
                handleFontZoom(defaultFontZoom);
            }
        }, [defaultFontZoom, handleFontZoom]);

        useEffect(() => {
            const { fontSizeList, lineHeightList } = fontSizeConfig;
            _forEach(
                fontSizeList.split(',').map((item: string) => item.trim()),
                (fontSize: string) => {
                    document.documentElement.style.setProperty(
                        `--font-size-${fontSize}`,
                        `${_round(_toNumber(fontSize) * fontZoom)}px`
                    );
                }
            );
            _forEach(
                lineHeightList.split(',').map((item: string) => item.trim()),
                (lineHeight: string) => {
                    document.documentElement.style.setProperty(
                        `--line-height-${lineHeight}`,
                        `${_round(_toNumber(lineHeight) * fontZoom)}px`
                    );
                }
            );
        }, [fontZoom]);

        return (
            <Context.Provider value={{ handleFontZoom, fontZoom }}>
                {children}
            </Context.Provider>
        );
    }
);
Provider.displayName = 'IFontSizeProvider';

export default Provider;
