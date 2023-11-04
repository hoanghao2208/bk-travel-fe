import useDataRef from 'hooks/tools/useDataRef';
import {
    createContext,
    FC,
    memo,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    generatePath,
    NavigateOptions,
    useNavigate,
    useParams,
} from 'react-router-dom';
import { CommonElementType } from 'utils/commonType';

const Context = createContext({});
interface IProviderProps {
    path: string;
    children: CommonElementType;
}

export const Provider: FC<IProviderProps> = memo(({ path, children }) => {
    const params = useParams();
    const paramsRef = useDataRef(params);
    const navigate = useNavigate();
    const [navigateTo, setNavigateTo] = useState<{
        url: string;
        options?: NavigateOptions;
    } | null>(null);
    const setParams = useCallback(
        (
            data: { [key: string]: string },
            customPath?: string,
            options?: NavigateOptions
        ) => {
            const generatedPath = generatePath(customPath ?? path, {
                ...paramsRef.current,
                ...data,
            });
            setNavigateTo({ url: generatedPath, options });
        },
        [paramsRef, path]
    );

    useEffect(() => {
        if (navigateTo) {
            navigate(navigateTo.url, navigateTo.options);
            setNavigateTo(null);
        }
    }, [navigate, navigateTo]);

    return (
        <Context.Provider
            value={{
                params,
                setParams,
                path,
            }}
        >
            {children}
        </Context.Provider>
    );
});
Provider.displayName = 'Provider';

const useRouteContext = () => useContext(Context);

export default useRouteContext;
