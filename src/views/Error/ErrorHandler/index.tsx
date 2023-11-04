import { FC, memo } from 'react';
import E401 from 'views/Error/ErrorHandler/E401';
import E404 from 'views/Error/ErrorHandler/E404';

interface IErrorHanlderProps {
    code: number;
    message: string;
}

export const ErrorHandler: FC<IErrorHanlderProps> = memo(({ code }) => {
    switch (code) {
        case 401:
            return <E401 />;
        case 404:
            return <E404 />;
        default:
            return null;
    }
});
ErrorHandler.displayName = 'ErrorHandler';

export default ErrorHandler;
