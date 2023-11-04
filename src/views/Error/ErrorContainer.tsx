import { FC, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { errorActions } from 'reducers/error';
import { ErrorState } from 'reducers/error/type';
import { StoreState } from 'store/type';
import { CommonElementType } from 'utils/commonType';
import ErrorBoundary from 'views/Error/ErrorBoundary';
import ErrorHandler from 'views/Error/ErrorHandler';

interface IErrorContainerProps {
    children: CommonElementType;
}

const ErrorContainer: FC<IErrorContainerProps> = memo(({ children }) => {
    const pathname = window?.location?.href;
    const dispatch = useDispatch();
    const error = useSelector((state: StoreState) => state.error);
    const resetError = useCallback(() => {
        dispatch(errorActions.RESET_ERROR());
    }, [dispatch]);

    const setError = useCallback(
        (error: ErrorState) => {
            dispatch(errorActions.SET_ERROR(error));
        },
        [dispatch]
    );

    return (
        <ErrorBoundary
            pathname={pathname}
            onResetError={resetError}
            onSetError={setError}
            error={error}
        >
            <ErrorHandler code={error.code} message={error.message} />
            {!error?.code ? children : null}
        </ErrorBoundary>
    );
});
ErrorContainer.displayName = 'ErrorContainer';

export default ErrorContainer;
