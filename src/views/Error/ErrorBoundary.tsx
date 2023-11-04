import { PureComponent } from 'react';
import { setError } from 'reducers/error/function';
import { CommonElementType } from 'utils/commonType';

interface IErrorBoundaryProps {
    children: CommonElementType[];
    pathname: string;
    onResetError: () => void;
    onSetError: (error: any) => void;
    error: {
        message: string;
        code: number;
    };
}

interface IErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends PureComponent<
    IErrorBoundaryProps,
    IErrorBoundaryState
> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidUpdate(
        prevProps: IErrorBoundaryProps,
        preState: IErrorBoundaryState
    ) {
        if (prevProps.pathname !== this.props.pathname) {
            this.setState({ hasError: false });
            this.props.onResetError();
            setError(0, '');
        }
        if (this.state.hasError && !preState.hasError) {
            // Make side effect action here
        }
    }

    static getDerivedStateFromError(_error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(_error: any, _errorInfo: any) {
        // You can also log the error to an error reporting service
    }

    render() {
        if (this.state.hasError) {
            return <h4>Something went wrong.</h4>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
