import { memo } from 'react';
import { Provider } from 'react-redux';
import RouteController from 'route/RouteController';
import store, { persistor } from 'store/Store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LoadingScreen from 'views/LoadingScreen/LoadingScreen';
import FontSizeProvider from 'theme/FontSizeProvider';
import ErrorContainer from 'views/Error/ErrorContainer';

const App = memo(() => {
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                <ErrorContainer>
                    <FontSizeProvider>
                        <RouteController />
                    </FontSizeProvider>
                </ErrorContainer>
            </PersistGate>
        </Provider>
    );
});
App.displayName = 'App';

export default App;
