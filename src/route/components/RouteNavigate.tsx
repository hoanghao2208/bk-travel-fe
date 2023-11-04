import { FC, memo, useMemo } from 'react';
import { generatePath, Navigate, useParams } from 'react-router-dom';
interface IProps {
    to: string;
}

const RouteNavigate: FC<IProps> = memo(({ to }) => {
    const params = useParams();

    const target = useMemo(() => generatePath(to, params), [params, to]);

    return <Navigate to={target} replace />;
});
RouteNavigate.displayName = 'RouteNavigate';

export default RouteNavigate;
