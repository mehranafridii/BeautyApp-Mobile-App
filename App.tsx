import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {persistedStore, Store} from './src/Redux/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './src/navigators/Routes/Routes';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'white' : 'white',
  };

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Routes />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

export default App;
