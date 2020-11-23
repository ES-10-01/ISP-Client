import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import reducer from './data/Reducers';

const store = createStore(reducer);

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <PaperProvider>
                    <Provider store={store}>
                        <Navigation colorScheme={colorScheme} />
                    </Provider>
                </PaperProvider>
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}
