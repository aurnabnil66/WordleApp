import React, {useEffect, useState} from 'react';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import Navigator from './src/navigation/Navigator';
import {PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <PaperProvider>
          {isLoading ? <SplashScreen /> : <Navigator />}
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
